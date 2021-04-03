import { Ctx } from "blitz"
import db from "db"

export default async function getUsersActiveService(input: number, ctx: Ctx) {
  ctx.session.$authorize()
  return await db.carServiceUserRelation.findFirst({
    where: { carServiceId: input },
    select: {
      userRole: true,
      carService: {
        select: {
          url: true,
          name: true,
          description: true,
          avatarUrl: true,
          income: true,
          plan: true,
        },
      },
    },
  })
}
