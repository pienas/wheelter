/*
  Warnings:

  - A unique constraint covering the columns `[orderId]` on the table `Promo` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Promo" ADD COLUMN     "orderId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Promo_orderId_unique" ON "Promo"("orderId");

-- AddForeignKey
ALTER TABLE "Promo" ADD CONSTRAINT "Promo_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;
