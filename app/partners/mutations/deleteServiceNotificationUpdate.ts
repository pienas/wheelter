import db, { Prisma } from "db"

export default async function deleteServiceNotificationUpdate(
  input: Prisma.NotificationUpdateDeleteManyArgs
) {
  return await db.notificationUpdate.deleteMany(input)
}
