import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetServiceOrdersInput
  extends Pick<Prisma.OrderFindManyArgs, "where" | "select" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, select, orderBy, skip = 0, take = 10 }: GetServiceOrdersInput) => {
    const { items: serviceOrders, hasMore, nextPage, count } = await paginate({
      skip,
      take,
      count: () => db.order.count({ where }),
      query: (paginateArgs) => db.order.findMany({ ...paginateArgs, where, select, orderBy }),
    })
    return {
      serviceOrders,
      nextPage,
      hasMore,
      count,
    }
  }
)
