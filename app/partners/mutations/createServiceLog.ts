import db, { Prisma } from "db"

export default async function createServiceLog(input: Prisma.LogCreateArgs) {
  return await db.log.create(input)
}
