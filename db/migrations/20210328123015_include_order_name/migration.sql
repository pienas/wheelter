/*
  Warnings:

  - You are about to drop the column `rating` on the `CarService` table. All the data in the column will be lost.
  - Added the required column `name` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CarService" DROP COLUMN "rating";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "name" TEXT NOT NULL;
