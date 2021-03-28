import { Ctx } from "blitz"
import db, { Prisma } from "db"

export default async function getServiceReviewsCount(input: Prisma.ReviewCountArgs, ctx: Ctx) {
  ctx.session.$authorize()
  return await db.review.count(input)
}
