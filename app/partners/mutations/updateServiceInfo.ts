import db, { Prisma } from "db"

export default async function updateServiceInfo(input: Prisma.CarServiceUpdateArgs) {
  return await db.carService.update(input)
}
