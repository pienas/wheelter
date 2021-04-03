import { Ctx } from "blitz"
import db, { Prisma } from "db"

export default async function getServiceImagesCount(input: Prisma.ImageCountArgs, ctx: Ctx) {
  ctx.session.$authorize()
  return await db.image.count(input)
}
