/*
  Warnings:

  - You are about to drop the column `carServiceUserId` on the `CarService` table. All the data in the column will be lost.
  - You are about to drop the column `userWhoLikesId` on the `CarService` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "CarService" DROP CONSTRAINT "CarService_carServiceUserId_fkey";

-- DropForeignKey
ALTER TABLE "CarService" DROP CONSTRAINT "CarService_userWhoLikesId_fkey";

-- AlterTable
ALTER TABLE "CarService" DROP COLUMN "carServiceUserId",
DROP COLUMN "userWhoLikesId";

-- CreateTable
CREATE TABLE "_CarServiceToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CarServiceToCarServiceUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CarServiceToUser_AB_unique" ON "_CarServiceToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_CarServiceToUser_B_index" ON "_CarServiceToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CarServiceToCarServiceUser_AB_unique" ON "_CarServiceToCarServiceUser"("A", "B");

-- CreateIndex
CREATE INDEX "_CarServiceToCarServiceUser_B_index" ON "_CarServiceToCarServiceUser"("B");

-- AddForeignKey
ALTER TABLE "_CarServiceToUser" ADD FOREIGN KEY ("A") REFERENCES "CarService"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CarServiceToUser" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CarServiceToCarServiceUser" ADD FOREIGN KEY ("A") REFERENCES "CarService"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CarServiceToCarServiceUser" ADD FOREIGN KEY ("B") REFERENCES "CarServiceUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;
