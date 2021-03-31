/*
  Warnings:

  - You are about to drop the column `isRevieved` on the `CarService` table. All the data in the column will be lost.
  - You are about to drop the column `isRevieved` on the `Review` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CarService" DROP COLUMN "isRevieved",
ADD COLUMN     "isReviewed" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "isRevieved",
ADD COLUMN     "isReviewed" BOOLEAN NOT NULL DEFAULT false;
