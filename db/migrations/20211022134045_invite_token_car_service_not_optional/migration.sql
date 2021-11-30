/*
  Warnings:

  - Made the column `carServiceId` on table `InviteToken` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "InviteToken" DROP CONSTRAINT "InviteToken_carServiceId_fkey";

-- AlterTable
ALTER TABLE "InviteToken" ALTER COLUMN "carServiceId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "InviteToken" ADD CONSTRAINT "InviteToken_carServiceId_fkey" FOREIGN KEY ("carServiceId") REFERENCES "CarService"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
