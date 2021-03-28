import { Ctx } from "blitz"
import db, { Prisma } from "db"

export default async function getServiceNotifications(
  input: Prisma.NotificationCountArgs,
  ctx: Ctx
) {
  ctx.session.$authorize()
  return await db.notification.count(Object.assign(input))
}
