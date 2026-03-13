-- CreateEnum
CREATE TYPE "Sex" AS ENUM ('hen', 'rooster');

-- CreateEnum
CREATE TYPE "ChickenStatus" AS ENUM ('active', 'sold', 'deceased');

-- CreateTable
CREATE TABLE "Chicken" (
    "id" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,
    "breed" TEXT NOT NULL,
    "sex" "Sex" NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "weight" DOUBLE PRECISION,
    "status" "ChickenStatus" NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Chicken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Chicken_tagId_key" ON "Chicken"("tagId");
