import { Ctx } from "blitz"
import db, { Prisma } from "db"

export default async function getServiceRating(input: Prisma.ReviewAggregateArgs, ctx: Ctx) {
  ctx.session.$authorize()
  return await db.review.aggregate(Object.assign(input))
}
