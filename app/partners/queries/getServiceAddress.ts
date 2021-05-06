import { Ctx } from "blitz"
import db, { Prisma } from "db"

export default async function getServiceAddress(input: Prisma.AddressFindFirstArgs, ctx: Ctx) {
  ctx.session.$authorize()
  return await db.address.findFirst(input)
}
