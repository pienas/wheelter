import db, { Prisma } from "db"

export default async function createEmployee(input: Prisma.EmployeeCreateArgs) {
  return await db.employee.create(input)
}
