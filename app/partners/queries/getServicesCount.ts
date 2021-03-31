import { Ctx } from "blitz"
import db, { Prisma } from "db"

export default async function getServicesCount(input: Prisma.CarServiceCountArgs, ctx: Ctx) {
  ctx.session.$authorize()
  return await db.carService.count(input)
}
