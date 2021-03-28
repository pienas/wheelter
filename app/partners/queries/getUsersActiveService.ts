import { Ctx } from "blitz"
import db, { Prisma } from "db"

export default async function getUsersActiveService(
  input: Prisma.CarServiceUserRelationFindFirstArgs,
  ctx: Ctx
) {
  ctx.session.$authorize()
  return await db.carServiceUserRelation.findFirst(
    Object.assign(input, {
      include: { carService: true, user: true },
    } as Prisma.CarServiceUserRelationFindFirstArgs)
  )
}
