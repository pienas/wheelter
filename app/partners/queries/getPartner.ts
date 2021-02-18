import { resolver, NotFoundError } from "blitz"
import db from "db"
import * as z from "zod"

const GetPartner = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetPartner), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const partner = await db.partner.findFirst({ where: { id } })

  if (!partner) throw new NotFoundError()

  return partner
})
