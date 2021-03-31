/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[paymentUrl]` on the table `CarService`. If there are existing duplicate values, the migration will fail.

*/
-- AlterTable
ALTER TABLE "CarService" ADD COLUMN     "plan" TEXT NOT NULL DEFAULT E'STANDARD',
ADD COLUMN     "paymentExpiresAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "paymentMethod" TEXT NOT NULL DEFAULT E'CARD',
ADD COLUMN     "paymentUrl" TEXT NOT NULL DEFAULT E'';

-- CreateIndex
CREATE UNIQUE INDEX "CarService.paymentUrl_unique" ON "CarService"("paymentUrl");
