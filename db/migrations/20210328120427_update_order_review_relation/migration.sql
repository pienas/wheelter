/*
  Warnings:

  - You are about to drop the column `reviewId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `isRevievew` on the `Review` table. All the data in the column will be lost.
  - The migration will add a unique constraint covering the columns `[orderId]` on the table `Review`. If there are existing duplicate values, the migration will fail.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_reviewId_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "reviewId";

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "isRevievew",
ADD COLUMN     "isRevieved" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "orderId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Review_orderId_unique" ON "Review"("orderId");

-- AddForeignKey
ALTER TABLE "Review" ADD FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;
