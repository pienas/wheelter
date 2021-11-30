import { Ctx } from "blitz"
import db, { Prisma } from "db"

export default async function getUserOrderNotifications(
  input: Prisma.NotificationOrderFindManyArgs,
  ctx: Ctx
) {
  ctx.session.$authorize()
  return await db.notificationOrder.findMany(input)
}
