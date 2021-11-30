/*
  Warnings:

  - You are about to drop the column `orderId` on the `Promo` table. All the data in the column will be lost.
  - Added the required column `discount` to the `Promo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Promo" DROP CONSTRAINT "Promo_orderId_fkey";

-- DropIndex
DROP INDEX "Promo_orderId_unique";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "promoId" INTEGER;

-- AlterTable
ALTER TABLE "Promo" DROP COLUMN "orderId",
ADD COLUMN     "discount" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_promoId_fkey" FOREIGN KEY ("promoId") REFERENCES "Promo"("id") ON DELETE SET NULL ON UPDATE CASCADE;
