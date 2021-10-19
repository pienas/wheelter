import { Ctx } from "blitz"
import db, { Prisma } from "db"

export default async function getServiceUrl(input: number, ctx: Ctx) {
  ctx.session.$authorize()
  return await db.carService.findFirst({
    where: { id: input },
    select: {
      url: true,
    },
  })
}
