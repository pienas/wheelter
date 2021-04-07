import db, { Prisma } from "db"

export default async function createServiceImages(input: Prisma.ImageCreateArgs) {
  return await db.image.create(input)
}
