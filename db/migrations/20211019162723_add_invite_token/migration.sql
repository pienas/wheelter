-- CreateTable
CREATE TABLE "InviteToken" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "hashedToken" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "carServiceId" INTEGER,

    CONSTRAINT "InviteToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "InviteToken_hashedToken_type_key" ON "InviteToken"("hashedToken", "type");

-- AddForeignKey
ALTER TABLE "InviteToken" ADD CONSTRAINT "InviteToken_carServiceId_fkey" FOREIGN KEY ("carServiceId") REFERENCES "CarService"("id") ON DELETE SET NULL ON UPDATE CASCADE;
