-- AlterTable
ALTER TABLE "CarService" ALTER COLUMN "paymentExpiresAt" DROP NOT NULL,
ALTER COLUMN "paymentMethod" DROP NOT NULL,
ALTER COLUMN "paymentUrl" DROP NOT NULL;
