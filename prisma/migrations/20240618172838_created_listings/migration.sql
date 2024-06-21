-- CreateEnum
CREATE TYPE "ListingType" AS ENUM ('offer', 'request');

-- CreateEnum
CREATE TYPE "ListingStatus" AS ENUM ('active', 'complete', 'delisted');

-- CreateTable
CREATE TABLE "Listing" (
    "id" SERIAL NOT NULL,
    "author_id" INTEGER NOT NULL,
    "type" "ListingType" NOT NULL,
    "message" VARCHAR NOT NULL,
    "reward" INTEGER NOT NULL,
    "status" "ListingStatus" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Listing_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Listing" ADD CONSTRAINT "Listing_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "Account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
