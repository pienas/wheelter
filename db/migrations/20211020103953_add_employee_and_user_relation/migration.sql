/*
  Warnings:

  - You are about to drop the column `carServiceUserId` on the `Employee` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_carServiceUserId_fkey";

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "carServiceUserId",
ADD COLUMN     "userId" INTEGER;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
