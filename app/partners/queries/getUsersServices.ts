import { Ctx } from "blitz"
import db from "db"

export default async function getUsersServices(_ = null, { session }: Ctx) {
  if (!session.userId) return null

  const services = await db.carServiceUserRelation.findMany({
    where: {
      userId: session.userId,
    },
    select: {
      carServiceId: true,
      carService: {
        select: {
          name: true,
          avatarUrl: true,
          address: {
            select: {
              city: true,
              street: true,
            },
          },
        },
      },
    },
    orderBy: { carService: { name: "asc" } },
  })

  return services
}
