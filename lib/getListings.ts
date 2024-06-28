import 'server-only'

import prisma from "@/db"
import { Listing } from "@/types/listing";

export async function getListings(): Promise<Listing[]> {

  const listings: Listing[] = await prisma.listing.findMany()

  return listings
}