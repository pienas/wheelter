import db, { Prisma } from "db"

export default async function deleteEmployee(input: Prisma.EmployeeDeleteManyArgs) {
  return await db.employee.deleteMany(input)
}
