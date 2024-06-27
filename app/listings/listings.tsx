'use client'

import { Claims } from "@auth0/nextjs-auth0";
import { Account } from "@/types/account";
import { Listing } from "@/types/listing";
import { useState } from "react";
import contentStyles from "@/styles/contents.module.css";
import CreateListingForm from "./createListingForm";

export default function Listings({
  user,
  accounts,
  listings
}: {
  user: Claims,
  accounts: Account[],
  listings: Listing[]
}) {

  const [editableListings, setEditableListings] = useState([...listings].reverse())
  
  const getName = (thisId: number) => {
    const thisAccount: Account | undefined = accounts.find((account) => account.id === thisId)
    return thisAccount ? thisAccount.name : "Unknown"
  };

  return (
    <div>
      <CreateListingForm user={user} setEditableListings={setEditableListings} />
      <ul className={contentStyles.contentBox}>
        {user && editableListings.map((listing, index) => {
            return (
              <li key={index} className={`px-4 py-2 my-4 items-center ${listing.author_id === user.account_id ? 'text-blue-400' : ''}`}>
                    <div className="flex justify-between">
                        <span className="mr-4">{listing.message}</span>
                        <span>{listing.reward} ∈</span>
                    </div>
                    <p className="mt-2 text-xs">{listing.type} posted by {getName(listing.author_id)}</p>
              </li>
            )
        })}
      </ul>
    </div>
  );
}