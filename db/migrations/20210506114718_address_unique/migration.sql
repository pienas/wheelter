/*
  Warnings:

  - You are about to drop the column `appartment` on the `Address` table. All the data in the column will be lost.
  - The migration will add a unique constraint covering the columns `[carServiceId]` on the table `Address`. If there are existing duplicate values, the migration will fail.

*/
-- DropIndex
DROP INDEX "CarService.email_unique";

-- DropIndex
DROP INDEX "CarService.phone_unique";

-- AlterTable
ALTER TABLE "Address" DROP COLUMN "appartment";

-- CreateIndex
CREATE UNIQUE INDEX "Address.carServiceId_unique" ON "Address"("carServiceId");
