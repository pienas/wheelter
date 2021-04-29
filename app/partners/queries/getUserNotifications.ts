import { Ctx } from "blitz"
import db, { Prisma } from "db"

export default async function getUserNotifications(
  input: Prisma.NotificationFindManyArgs,
  ctx: Ctx
) {
  ctx.session.$authorize()
  return await db.notification.findMany(input)
}
