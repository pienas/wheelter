-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "carServiceUserId" INTEGER;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_carServiceUserId_fkey" FOREIGN KEY ("carServiceUserId") REFERENCES "CarServiceUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;
