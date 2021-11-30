import { resolver, SecurePassword } from "blitz"
import db from "db"
import { CreateEmployee } from "../validations"

export class CreateEmployeeFromTokenError extends Error {
  name = "CreateEmployeeFromTokenError"
  message = "Nuoroda yra klaidinga arba baigėsi jos galiojimo laikas."
}

export default resolver.pipe(
  resolver.zod(CreateEmployee),
  async ({ password, token, name, surname, email, phone }, ctx) => {
    const possibleToken = await db.inviteToken.findFirst({
      where: { hashedToken: token, type: "INVITE_TOKEN" },
      select: {
        id: true,
        expiresAt: true,
        carServiceId: true,
        carService: {
          select: {
            id: true,
          },
        },
        createdBy: {
          select: {
            id: true,
          },
        },
      },
    })
    if (!possibleToken) throw new CreateEmployeeFromTokenError()
    const savedToken = possibleToken
    await db.inviteToken.delete({ where: { id: savedToken.id } })
    if (savedToken.expiresAt < new Date()) throw new CreateEmployeeFromTokenError()
    const hashedPassword = await SecurePassword.hash(password)
    const carServiceUser = await db.carServiceUser.create({
      data: { name, surname, email, phone, hashedPassword },
    })
    await db.carServiceUserRelation.create({
      data: { carServiceId: savedToken.carServiceId, userId: carServiceUser.id },
    })
    const employee = await db.employee.create({
      data: {
        name,
        surname,
        position: "Darbuotojas",
        carServiceId: savedToken.carServiceId,
        carServiceUserId: carServiceUser.id,
      },
    })
    await db.notificationUpdate.create({
      data: {
        type: "EMPLOYEE",
        employeeId: employee.id,
        carServiceUserId: savedToken.createdBy[0].id,
      },
    })
    await db.log.create({
      data: {
        carServiceId: savedToken.carServiceId,
        updatedById: 1,
        updatedWhat: `employee?action=createSelf&id=${employee.id}&name=${name}&surname=${surname}&position=Darbuotojas&carServiceId=${savedToken.carServiceId}&carServiceUserId=${carServiceUser.id}`,
      },
    })
    return true
  }
)
