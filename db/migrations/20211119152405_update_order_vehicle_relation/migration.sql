/*
  Warnings:

  - You are about to drop the column `orderId` on the `Vehicle` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Vehicle" DROP CONSTRAINT "Vehicle_orderId_fkey";

-- DropIndex
DROP INDEX "Vehicle_orderId_unique";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "vehicleId" INTEGER;

-- AlterTable
ALTER TABLE "Vehicle" DROP COLUMN "orderId";

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE SET NULL ON UPDATE CASCADE;
