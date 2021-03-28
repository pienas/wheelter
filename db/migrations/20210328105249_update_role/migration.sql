/*
  Warnings:

  - You are about to drop the column `role` on the `CarServiceUser` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CarServiceUser" DROP COLUMN "role";

-- AlterTable
ALTER TABLE "CarServiceUserRelation" ADD COLUMN     "userRole" TEXT NOT NULL DEFAULT E'Darbuotojas';
