import { Ctx } from "blitz"
import db, { Prisma } from "db"

export default async function getServiceImages(input: Prisma.ImageFindManyArgs, ctx: Ctx) {
  ctx.session.$authorize()
  return await db.image.findMany(input)
}
