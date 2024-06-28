'use client'

import Image from 'next/image'
import { Claims } from "@auth0/nextjs-auth0";
import { Account } from "@/types/account";
import { Listing, ListingStatus } from "@/types/listing";
import { ChangeEvent, FormEvent, useState } from "react";
import { updateListing } from '@/lib/updateListing';
import contentStyles from "@/styles/contents.module.css";
import formStyles from "@/styles/form.module.css"

export default function Listings({
  user,
  accounts,
  editableListings,
  setEditableListings,
  status
}: {
  user: Claims,
  accounts: Account[],
  editableListings: Listing[],
  setEditableListings: React.Dispatch<React.SetStateAction<Listing[]>>,
  status?: ListingStatus
}) {

  // Manage state for the listing currently being edited by the user.
  const [editedListing, setEditedListing] = useState<Listing | null>(null)

  const handleEdit = (listing: Listing) => {
    setEditedListing(listing)
  };

  const handleSave = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()  // Prevent the default form submission behavior

    if (!editedListing) throw new Error("no listing is selected")

    console.log("Updating listing")
    updateListing(editedListing).then(updatedListing => {
      // If update is successful, update the UI
      const updatedListings = editableListings.map(listing =>
        listing.id === editedListing.id ? editedListing : listing
      );
      setEditableListings(updatedListings)

      console.log(updatedListing)
    }).catch(error => {
      // Handle potential errors
      console.error("Error updating listing:", error)
    });
    console.log(editedListing)
    setEditedListing(null)
  };

  const handleCancel = () => {
    setEditedListing(null)
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {

    if (!editedListing) throw new Error("no listing is selected")

    const { value, name } = event.target;

    setEditedListing(prev => ({
      ...prev!,
      [name]: value
    }));
  };
  
  const getName = (thisId: number) => {
    const thisAccount: Account | undefined = accounts.find((account) => account.id === thisId)
    return thisAccount ? thisAccount.name : "Unknown"
  };

  return (
    <ul className={contentStyles.contentBox}>
      {user && editableListings.filter(listing => !status || listing.status === status).map((listing, index) => {
        if (listing.id === editedListing?.id) {
          return (
            <li key={index} className="px-4 py-2 my-4">
              <h2 className="mb-6">Edit Listing</h2>
              <form onSubmit={handleSave} className="w-full space-y-4 max-w-2xl">
                <label htmlFor="message" className={formStyles.formLabel}>Describe the good or service you are {editedListing.type === "offer" ? "offering" : "requesting"}.</label>
                <input
                  type="text"
                  id="message"
                  name="message"
                  value={editedListing.message}
                  onChange={handleChange}
                  placeholder="Message"
                  className={formStyles.formTextInput}
                />
                <label htmlFor="reward" className={formStyles.formLabel}>Price in ∈dges</label>
                <input
                  type="number"
                  id="reward"
                  name="reward"
                  placeholder="0"
                  value={editedListing.reward}
                  onChange={handleChange}
                  className={formStyles.formTextInput}
                  step="1" // Ensure whole numbers only
                  required
                />
                <label htmlFor="status" className={formStyles.formLabel}>Listing Status</label>
                <select id="status" name="status" value={editedListing.status} onChange={handleChange} className={formStyles.formTextInput}>
                  <option value="active">Active</option>
                  <option value="complete">Mark as Completed</option>
                  <option value="delisted">Delist</option>
                </select>
                <div className="text-center">
                    <button type="submit" className="bg-green-500 text-white px-2 py-1 rounded mr-2">Save</button>
                    <button type="button" onClick={handleCancel} className="bg-red-500 text-white px-2 py-1 rounded">Cancel</button>
                </div>
              </form>
            </li>
          )
        } else {
          return (
            <li key={index} className={`px-4 py-2 my-4 flex justify-between items-center ${listing.author_id === user.account_id ? 'text-blue-400' : ''}`}>
              <div className="flex-1 mr-4 lg:mr-0">
                <span>{listing.message}</span>
                <p className="mt-2 text-xs">{listing.type} posted by {getName(listing.author_id)}</p>
              </div>
              <span className="mr-2 lg:mr-4">{listing.reward} ∈</span>
              {listing.author_id === user.account_id && (
                <button type="button" onClick={() => handleEdit(listing)} className="text-white lg:px-2 lg:py-1 rounded">
                    <Image src="/edit-pencil.svg" alt="edit" width="32" height="32" />
                </button>
              )}
            </li>
          )
        }
      })}
    </ul>
  );
}