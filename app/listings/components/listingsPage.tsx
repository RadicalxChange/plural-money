'use client'

import { Claims } from "@auth0/nextjs-auth0";
import { Account } from "@/types/account";
import { Listing } from "@/types/listing";
import { useState } from "react";
import CreateListingForm from "./createListingForm";
import Listings from './listings';

export default function ListingsPage({
  user,
  accounts,
  listings
}: {
  user: Claims,
  accounts: Account[],
  listings: Listing[]
}) {

  const [editableListings, setEditableListings] = useState<Listing[]>([...listings].reverse())

  return (
    <>
    <CreateListingForm
      user={user}
      setEditableListings={setEditableListings}
    />
    <Listings
      user={user}
      accounts={accounts}
      editableListings={editableListings}
      setEditableListings={setEditableListings}
      status={"active"}
    />
    <h2 className="my-12">Completed Listings</h2>
    <Listings
      user={user}
      accounts={accounts}
      editableListings={editableListings}
      setEditableListings={setEditableListings}
      status={"complete"}
    />
    <h2 className="my-12">Your Deleted Listings</h2>
    <Listings
      user={user}
      accounts={accounts}
      editableListings={editableListings}
      setEditableListings={setEditableListings}
      status={"delisted"}
    />
    </>
  );
}