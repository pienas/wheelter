import db, { Prisma } from "db"

export default async function updateServiceAvatar(input: Prisma.CarServiceUpdateArgs) {
  return await db.carService.update(input)
}
