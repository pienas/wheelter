import db, { Prisma } from "db"

export default async function updateUserUpdateNotification(
  input: Prisma.NotificationUpdateUpdateManyArgs
) {
  return await db.notificationUpdate.updateMany(input)
}
