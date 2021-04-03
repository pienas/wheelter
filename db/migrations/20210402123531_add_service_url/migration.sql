/*
  Warnings:

  - You are about to drop the column `url` on the `CarServiceUser` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CarService" ADD COLUMN     "url" TEXT;

-- AlterTable
ALTER TABLE "CarServiceUser" DROP COLUMN "url";
