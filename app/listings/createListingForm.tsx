'use client'

import { Claims } from "@auth0/nextjs-auth0";
import { Listing, StagedListing } from "@/types/listing";
import { FormEvent, useState } from "react";
import formStyles from "@/styles/form.module.css"
import { createListing } from "@/lib/createListing";

export default function CreateListingForm({
  user,
  setEditableListings
}: {
  user: Claims,
  setEditableListings: React.Dispatch<React.SetStateAction<Listing[]>>
}) {

  const [showForm, setShowForm] = useState(false);
  const [formInput, setFormInput] = useState({message: '', type: 'offer', reward: 0});

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormInput(prev => ({ ...prev, [name]: value }));
  };

  const submitListing = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()  // Prevent the default form submission behavior

    const newListing: StagedListing = {
      author_id: user.account_id,
      message: formInput.message,
      type: formInput.type as "offer" | "request",
      reward: Number(formInput.reward),
      status: "active",
    };

    // Create the new listing
    createListing(newListing).then(createdListing => {
      // Add it to the front of the list
      setEditableListings(prevListings => [createdListing, ...prevListings]);
      console.log("Created new listing:", createdListing);
    }).catch(error => {
      // Handle potential errors
      console.error("Error creating new listing:", error);
    });

    // Clear the form
    toggleForm()
  };

  const toggleForm = () => {
    setFormInput({message: '', type: 'offer', reward: 0})
    setShowForm(!showForm)
  };

  return (
    <div>
      {showForm ? (
        <h2 className="mb-6">New Listing</h2>
      ) : (
        <button 
          className="px-4 py-2 my-4 items-center border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-gray-400 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={toggleForm}
        >
          Create new listing
        </button>
      )}
      {showForm && (
        <form onSubmit={submitListing} className="space-y-4 max-w-2xl mb-12">
          <label htmlFor="type" className={formStyles.formLabel}>Is this an offer or a request?</label>
          <select id="type" name="type" value={formInput.type} onChange={handleFormChange} className={formStyles.formTextInput}>
            <option value="offer">Offer</option>
            <option value="request">Request</option>
          </select>
          <label htmlFor="message" className={formStyles.formLabel}>Describe the good or service you are {formInput.type === "offer" ? "offering" : "requesting"}.</label>
          <input
            type="text"
            id="message"
            name="message"
            value={formInput.message}
            onChange={handleFormChange}
            placeholder="Message"
            className={formStyles.formTextInput}
          />
          <label htmlFor="reward" className={formStyles.formLabel}>Price in ∈dges</label>
          <input
            type="number"
            id="reward"
            name="reward"
            placeholder="0"
            value={formInput.reward}
            onChange={handleFormChange}
            className={formStyles.formTextInput}
            step="1" // Ensure whole numbers only
            required
          />
          <button type="submit" className={formStyles.formButton}>Submit</button>
          <button type="button" onClick={toggleForm} className={`${formStyles.formButton} ${formStyles.cancelButton}`}>Cancel</button>
        </form>
      )}
    </div>
  );
}