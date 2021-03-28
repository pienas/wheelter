import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const UpdatePartner = z
  .object({
    id: z.number(),
    name: z.string(),
  })
  .nonstrict()

export default resolver.pipe(
  resolver.zod(UpdatePartner),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const partner = await db.carService.update({ where: { id }, data })

    return partner
  }
)
