'use server'

import prisma from "@/db"
import { Listing } from "@/types/listing"

export async function updateListing(data: Listing): Promise<Listing> {

  const updatedListing: Listing = await prisma.listing.update({
    where: {
      id: data.id,
    },
    data: {
      message: data.message,
      reward: +data.reward,
      contact: data.contact,
      status: data.status,
    }
  })

  return updatedListing
}