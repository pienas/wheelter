import { Ctx } from "blitz"
import db from "db"

export default async function getEmployees(input: number, ctx: Ctx) {
  ctx.session.$authorize()
  return await db.employee.findMany({
    where: { carServiceId: input },
    select: {
      id: true,
      name: true,
      surname: true,
      position: true,
      completedOrders: true,
      orders: {
        select: {
          price: true,
          status: true,
          review: {
            select: {
              rating: true,
              isReviewed: true,
            },
          },
        },
      },
    },
  })
}
