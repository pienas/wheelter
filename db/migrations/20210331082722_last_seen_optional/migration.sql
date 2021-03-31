-- AlterTable
ALTER TABLE "CarService" ALTER COLUMN "lastSeen" DROP NOT NULL;

-- AlterTable
ALTER TABLE "CarServiceUser" ALTER COLUMN "lastSeen" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "lastSeen" DROP NOT NULL;
