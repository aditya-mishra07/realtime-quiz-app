-- CreateEnum
CREATE TYPE "Visibility" AS ENUM ('private', 'public');

-- AlterTable
ALTER TABLE "Quiz" ADD COLUMN     "adminId" INTEGER,
ADD COLUMN     "type" "Visibility" NOT NULL DEFAULT 'private';

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- AddForeignKey
ALTER TABLE "Quiz" ADD CONSTRAINT "Quiz_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;
