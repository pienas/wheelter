/*
  Warnings:

  - You are about to alter the column `coordinateX` on the `Address` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `coordinateY` on the `Address` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `income` on the `CarService` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `expenses` on the `CarService` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `value` on the `CarServiceUserSetting` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `progress` on the `Goal` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `goal` on the `Goal` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `price` on the `Order` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `price` on the `Service` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `value` on the `Setting` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `value` on the `UserSetting` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `displacement` on the `Vehicle` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.

*/
-- DropForeignKey
ALTER TABLE "CarServiceUserRelation" DROP CONSTRAINT "CarServiceUserRelation_carServiceId_fkey";

-- DropForeignKey
ALTER TABLE "CarServiceUserRelation" DROP CONSTRAINT "CarServiceUserRelation_userId_fkey";

-- DropForeignKey
ALTER TABLE "Token" DROP CONSTRAINT "Token_userId_fkey";

-- AlterTable
ALTER TABLE "Address" ALTER COLUMN "coordinateX" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "coordinateY" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "CarService" ALTER COLUMN "income" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "expenses" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "CarServiceUserSetting" ALTER COLUMN "value" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Goal" ALTER COLUMN "progress" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "goal" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "price" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Service" ALTER COLUMN "price" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Setting" ALTER COLUMN "value" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "UserSetting" ALTER COLUMN "value" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Vehicle" ALTER COLUMN "displacement" SET DATA TYPE DOUBLE PRECISION;

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarServiceUserRelation" ADD CONSTRAINT "CarServiceUserRelation_carServiceId_fkey" FOREIGN KEY ("carServiceId") REFERENCES "CarService"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarServiceUserRelation" ADD CONSTRAINT "CarServiceUserRelation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "CarServiceUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "Address.carServiceId_unique" RENAME TO "Address_carServiceId_key";

-- RenameIndex
ALTER INDEX "CarService.url_unique" RENAME TO "CarService_url_key";

-- RenameIndex
ALTER INDEX "CarServiceUser.email_unique" RENAME TO "CarServiceUser_email_key";

-- RenameIndex
ALTER INDEX "CarServiceUser.phone_unique" RENAME TO "CarServiceUser_phone_key";

-- RenameIndex
ALTER INDEX "CarServiceUserSession.handle_unique" RENAME TO "CarServiceUserSession_handle_key";

-- RenameIndex
ALTER INDEX "CarServiceUserToken.hashedToken_type_unique" RENAME TO "CarServiceUserToken_hashedToken_type_key";

-- RenameIndex
ALTER INDEX "Promo.code_unique" RENAME TO "Promo_code_key";

-- RenameIndex
ALTER INDEX "Session.handle_unique" RENAME TO "Session_handle_key";

-- RenameIndex
ALTER INDEX "Token.hashedToken_type_unique" RENAME TO "Token_hashedToken_type_key";

-- RenameIndex
ALTER INDEX "User.email_unique" RENAME TO "User_email_key";

-- RenameIndex
ALTER INDEX "User.phone_unique" RENAME TO "User_phone_key";
