-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "carServiceId" INTEGER;

-- AddForeignKey
ALTER TABLE "Review" ADD FOREIGN KEY ("carServiceId") REFERENCES "CarService"("id") ON DELETE SET NULL ON UPDATE CASCADE;
