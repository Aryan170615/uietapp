/*
  Warnings:

  - You are about to drop the `Found` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Lost` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Type" AS ENUM ('lost', 'found');

-- DropTable
DROP TABLE "Found";

-- DropTable
DROP TABLE "Lost";

-- CreateTable
CREATE TABLE "LostFound" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" "Type" NOT NULL,
    "email" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LostFound_pkey" PRIMARY KEY ("id")
);
