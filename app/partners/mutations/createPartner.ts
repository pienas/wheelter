import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const CreatePartner = z
  .object({
    name: z.string(),
    description: z.string(),
    email: z.string(),
    phone: z.string(),
    avatarUrl: z.string(),
  })
  .nonstrict()

export default resolver.pipe(resolver.zod(CreatePartner), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const partner = await db.carService.create({ data: input })

  return partner
})
