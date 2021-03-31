/*
  Warnings:

  - Added the required column `lastSeen` to the `CarService` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastSeen` to the `CarServiceUser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastSeen` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CarService" ADD COLUMN     "lastSeen" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "paymentExpiresAt" DROP DEFAULT,
ALTER COLUMN "paymentMethod" DROP DEFAULT,
ALTER COLUMN "paymentUrl" DROP DEFAULT;

-- AlterTable
ALTER TABLE "CarServiceUser" ADD COLUMN     "lastSeen" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "lastSeen" TIMESTAMP(3) NOT NULL;
