-- CreateTable
CREATE TABLE "EggProduction" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "totalEggs" INTEGER NOT NULL,
    "brokenEggs" INTEGER NOT NULL DEFAULT 0,
    "unsellableEggs" INTEGER NOT NULL DEFAULT 0,
    "sellableEggs" INTEGER NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EggProduction_pkey" PRIMARY KEY ("id")
);
