import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetPartnersInput
  extends Pick<Prisma.PartnerFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetPartnersInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const { items: partners, hasMore, nextPage, count } = await paginate({
      skip,
      take,
      count: () => db.partner.count({ where }),
      query: (paginateArgs) => db.partner.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      partners,
      nextPage,
      hasMore,
      count,
    }
  }
)
