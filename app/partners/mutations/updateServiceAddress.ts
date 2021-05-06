import db, { Prisma } from "db"

export default async function updateServiceAddress(input: Prisma.AddressUpdateArgs) {
  return await db.address.update(input)
}
