import { Ctx } from "blitz"
import db, { Prisma } from "db"

export default async function getClientName(input: Prisma.UserFindFirstArgs, ctx: Ctx) {
  ctx.session.$authorize()
  return await db.user.findFirst(Object.assign(input))
}
