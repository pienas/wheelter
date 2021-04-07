import db, { Prisma } from "db"

export default async function deleteServiceImages(input: Prisma.ImageDeleteManyArgs) {
  return await db.image.deleteMany(input)
}
