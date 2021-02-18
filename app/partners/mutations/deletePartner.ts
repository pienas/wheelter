import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const DeletePartner = z
  .object({
    id: z.number(),
  })
  .nonstrict()

export default resolver.pipe(resolver.zod(DeletePartner), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const partner = await db.partner.deleteMany({ where: { id } })

  return partner
})
