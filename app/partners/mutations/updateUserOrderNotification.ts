import db, { Prisma } from "db"

export default async function updateUserOrderNotification(
  input: Prisma.NotificationOrderUpdateManyArgs
) {
  return await db.notificationOrder.updateMany(input)
}
