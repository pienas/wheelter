import { Ctx } from "blitz"
import db, { Prisma } from "db"

export default async function getServiceInviteTokens(
  input: Prisma.InviteTokenFindManyArgs,
  ctx: Ctx
) {
  ctx.session.$authorize()
  return await db.inviteToken.findMany(input)
}
