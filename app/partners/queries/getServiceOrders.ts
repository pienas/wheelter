import { Ctx } from "blitz"
import db, { Prisma } from "db"

export default async function getServiceOrders(input: Prisma.OrderFindManyArgs, ctx: Ctx) {
  ctx.session.$authorize()
  return await db.order.findMany(Object.assign(input))
}
