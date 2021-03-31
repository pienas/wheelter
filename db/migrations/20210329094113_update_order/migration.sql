/*
  Warnings:

  - You are about to drop the column `endsAt` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "endsAt",
DROP COLUMN "price",
DROP COLUMN "name";
