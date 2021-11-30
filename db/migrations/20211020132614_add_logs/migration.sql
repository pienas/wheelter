-- AlterTable
ALTER TABLE "Log" ADD COLUMN     "carServiceId" INTEGER;

-- AddForeignKey
ALTER TABLE "Log" ADD CONSTRAINT "Log_carServiceId_fkey" FOREIGN KEY ("carServiceId") REFERENCES "CarService"("id") ON DELETE SET NULL ON UPDATE CASCADE;
