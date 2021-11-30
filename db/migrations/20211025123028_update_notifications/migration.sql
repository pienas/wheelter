/*
  Warnings:

  - You are about to drop the `Notification` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "NotificationOrderType" AS ENUM ('NEW', 'UPDATED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "NotificationOrderUpdateType" AS ENUM ('TIME');

-- CreateEnum
CREATE TYPE "NotificationUpdateType" AS ENUM ('UPDATE', 'EMPLOYEE');

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_carServiceUserId_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_orderId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "inviteTokenId" INTEGER;

-- DropTable
DROP TABLE "Notification";

-- DropEnum
DROP TYPE "NotificationType";

-- CreateTable
CREATE TABLE "NotificationOrder" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "seen" BOOLEAN NOT NULL DEFAULT false,
    "type" "NotificationOrderType" NOT NULL,
    "updateType" "NotificationOrderUpdateType",
    "orderId" INTEGER,
    "carServiceUserId" INTEGER,

    CONSTRAINT "NotificationOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NotificationUpdate" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "seen" BOOLEAN NOT NULL DEFAULT false,
    "type" "NotificationUpdateType" NOT NULL,
    "title" TEXT,
    "message" TEXT,
    "employeeId" INTEGER,
    "carServiceUserId" INTEGER,

    CONSTRAINT "NotificationUpdate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NotificationOrder_orderId_unique" ON "NotificationOrder"("orderId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_inviteTokenId_fkey" FOREIGN KEY ("inviteTokenId") REFERENCES "InviteToken"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotificationOrder" ADD CONSTRAINT "NotificationOrder_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotificationOrder" ADD CONSTRAINT "NotificationOrder_carServiceUserId_fkey" FOREIGN KEY ("carServiceUserId") REFERENCES "CarServiceUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotificationUpdate" ADD CONSTRAINT "NotificationUpdate_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotificationUpdate" ADD CONSTRAINT "NotificationUpdate_carServiceUserId_fkey" FOREIGN KEY ("carServiceUserId") REFERENCES "CarServiceUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;
