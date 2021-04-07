import db, { Prisma } from "db"

export default async function checkServiceUrl(input: Prisma.CarServiceCountArgs) {
  return await db.carService.count(input)
}
