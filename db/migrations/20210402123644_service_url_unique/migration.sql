/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[url]` on the table `CarService`. If there are existing duplicate values, the migration will fail.
  - Made the column `url` on table `CarService` required. The migration will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "CarService" ALTER COLUMN "url" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "CarService.url_unique" ON "CarService"("url");
