import { Ctx } from "blitz"
import db, { Prisma } from "db"

export default async function getAllServiceOrders(input: Prisma.OrderFindManyArgs, ctx: Ctx) {
  ctx.session.$authorize()
  return await db.order.findMany(input)
}
