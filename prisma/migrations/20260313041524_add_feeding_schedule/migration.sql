-- CreateTable
CREATE TABLE "FeedingSchedule" (
    "id" TEXT NOT NULL,
    "chickenId" TEXT NOT NULL,
    "feedType" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "unit" TEXT NOT NULL,
    "feedingTime" TEXT NOT NULL,
    "notes" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FeedingSchedule_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FeedingSchedule" ADD CONSTRAINT "FeedingSchedule_chickenId_fkey" FOREIGN KEY ("chickenId") REFERENCES "Chicken"("id") ON DELETE CASCADE ON UPDATE CASCADE;
