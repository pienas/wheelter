import { resolver, generateToken, hash256 } from "blitz"
import db from "db"
import { CreateInviteToken } from "../validations"

const INVITE_TOKEN_EXPIRATION_IN_HOURS = 4

export default resolver.pipe(resolver.zod(CreateInviteToken), async ({ id, userId }) => {
  const carService = await db.carService.findFirst({ where: { id: id } })
  const token = generateToken()
  const hashedToken = hash256(token)
  const expiresAt = new Date()
  expiresAt.setHours(expiresAt.getHours() + INVITE_TOKEN_EXPIRATION_IN_HOURS)

  if (carService) {
    await db.inviteToken.deleteMany({
      where: { type: "INVITE_TOKEN", carServiceId: carService.id },
    })
    await db.inviteToken.create({
      data: {
        carService: { connect: { id: carService.id } },
        type: "INVITE_TOKEN",
        expiresAt,
        hashedToken,
        createdBy: { connect: { id: userId } },
      },
    })
  } else {
    await new Promise((resolve) => setTimeout(resolve, 750))
  }
  return
})
