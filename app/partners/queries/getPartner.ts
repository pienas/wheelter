import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetPartner = z.object({
  url: z.string().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetPartner), async ({ url }) => {
  const partner = await db.carService.findFirst({
    where: { url },
    select: {
      avatarUrl: true,
      description: true,
      email: true,
      isActive: true,
      name: true,
      phone: true,
      url: true,
      viewCount: true,
    },
  })
  if (!partner) throw new NotFoundError()
  return partner
})
