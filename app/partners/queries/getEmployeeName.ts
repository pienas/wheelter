import { Ctx } from "blitz"
import db, { Prisma } from "db"

export default async function getEmployeeName(input: Prisma.EmployeeFindFirstArgs, ctx: Ctx) {
  ctx.session.$authorize()
  return await db.employee.findFirst(Object.assign(input))
}
