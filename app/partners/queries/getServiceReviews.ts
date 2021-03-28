import { Ctx } from "blitz"
import db, { Prisma } from "db"

export default async function getServiceReviews(input: Prisma.ReviewCountArgs, ctx: Ctx) {
  ctx.session.$authorize()
  return await db.review.count(Object.assign(input))
}
