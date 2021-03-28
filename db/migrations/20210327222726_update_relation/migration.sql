/*
  Warnings:

  - You are about to drop the `_CarServiceToCarServiceUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CarServiceToCarServiceUser" DROP CONSTRAINT "_CarServiceToCarServiceUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_CarServiceToCarServiceUser" DROP CONSTRAINT "_CarServiceToCarServiceUser_B_fkey";

-- CreateTable
CREATE TABLE "CarServiceUserRelation" (
    "id" SERIAL NOT NULL,
    "carServiceId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- DropTable
DROP TABLE "_CarServiceToCarServiceUser";

-- AddForeignKey
ALTER TABLE "CarServiceUserRelation" ADD FOREIGN KEY ("carServiceId") REFERENCES "CarService"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarServiceUserRelation" ADD FOREIGN KEY ("userId") REFERENCES "CarServiceUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;
