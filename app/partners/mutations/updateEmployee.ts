import db, { Prisma } from "db"

export default async function updateEmployee(input: Prisma.EmployeeUpdateArgs) {
  return await db.employee.update(input)
}
