import db, { Prisma } from "db"

export default async function updateServiceImages(input: Prisma.ImageUpdateManyArgs) {
  return await db.image.updateMany(input)
}
