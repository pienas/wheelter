import { Ctx } from "blitz"
import db, { Prisma } from "db"

export default async function getServiceIncome(input: Prisma.OrderAggregateArgs, ctx: Ctx) {
  ctx.session.$authorize()
  return await db.order.aggregate(Object.assign(input))
}
