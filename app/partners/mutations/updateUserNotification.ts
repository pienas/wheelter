import db, { Prisma } from "db"

export default async function updateUserNotification(input: Prisma.NotificationUpdateManyArgs) {
  return await db.notification.updateMany(input)
}
