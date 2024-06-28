'use server'

import prisma from "@/db"
import { Listing, StagedListing } from "@/types/listing";

// TODO: handle errors
export async function createListing(data: StagedListing): Promise<Listing> {

  const createdListing: Listing = await prisma.listing.create({
    data: {
      author_id: data.author_id,
      type: data.type,
      message: data.message,
      reward: data.reward,
      status: data.status,
    }
  })

  return createdListing
}