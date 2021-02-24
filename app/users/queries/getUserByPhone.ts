import db from "db"

export default async function getUserByPhone(phone) {
  const user = await db.user.findFirst({
    where: { phone: phone },
    select: { phone: true },
  })

  return user
}
