import { Ctx } from "blitz"
import db, { Prisma } from "db"

export default async function getUsersServices(
  input: Prisma.CarServiceUserRelationFindManyArgs,
  ctx: Ctx
) {
  ctx.session.$authorize()
  return await db.carServiceUserRelation.findMany(
    Object.assign(input, {
      where: {
        userId: 1,
      },
      include: { carService: true },
    } as Prisma.CarServiceUserRelationFindManyArgs)
  )
}
