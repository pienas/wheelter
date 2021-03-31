/*
  Warnings:

  - You are about to drop the column `carServiceId` on the `Notification` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_carServiceId_fkey";

-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "carServiceId",
ADD COLUMN     "carServiceUserId" INTEGER;

-- AddForeignKey
ALTER TABLE "Notification" ADD FOREIGN KEY ("carServiceUserId") REFERENCES "CarServiceUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;
