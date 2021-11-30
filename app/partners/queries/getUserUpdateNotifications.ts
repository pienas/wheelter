import { Ctx } from "blitz"
import db, { Prisma } from "db"

export default async function getUserUpdateNotifications(
  input: Prisma.NotificationUpdateFindManyArgs,
  ctx: Ctx
) {
  ctx.session.$authorize()
  return await db.notificationUpdate.findMany(input)
}
