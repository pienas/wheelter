import { Ctx } from "blitz"
import db, { Prisma } from "db"

export default async function getServiceOrdersCount(input: Prisma.OrderCountArgs, ctx: Ctx) {
  ctx.session.$authorize()
  return await db.order.count(input)
}
