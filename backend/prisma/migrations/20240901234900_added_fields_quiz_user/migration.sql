/*
  Warnings:

  - Added the required column `points` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "State" AS ENUM ('not_started', 'question', 'leaderboard', 'ended');

-- AlterTable
ALTER TABLE "Quiz" ADD COLUMN     "currentState" "State" NOT NULL DEFAULT 'not_started',
ADD COLUMN     "hasStarted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "points" INTEGER NOT NULL;
