'use client'

import { useState, ChangeEvent, FormEvent } from 'react'
import { AccountFormState } from "@/types/account";
import { createAccount } from '@/lib/createAccount';

export default function AccountForm() {
  // State hook to store form field values
  const [formData, setFormData] = useState<AccountFormState>({
    name: '',
    email: '',
    balance: '',
    isMember: true
  });

  // Handler for changes in form inputs
  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? (target as HTMLInputElement).checked : target.value;
    const name = target.name;

    setFormData(prevFormData => ({
        ...prevFormData,
        [name]: value
    }));
  };

  // Function to handle form submission
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();  // Prevent the default form submission behavior

    console.log("Creating a new account:", formData);
    createAccount(formData).then(createdAccount => {
        // Handle the created account, e.g., update state, log, etc.
        console.log(createdAccount);
      }).catch(error => {
        // Handle potential errors
        console.error("Error creating account:", error);
      });

    // Clear the form fields
    setFormData({
        name: '',
        email: '',
        balance: '',
        isMember: true
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl" autoComplete="off">
        <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-400">Name</label>
            <input
                type="text"
                id="name"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 lg:px-4 lg:py-3 font-mono text-sm border rounded-xl bg-gray-200 border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit"
                required
            />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-400">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 lg:px-4 lg:py-3 font-mono text-sm border rounded-xl bg-gray-200 border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit"
            required
          />
        </div>
        <div>
            <label htmlFor="balance" className="block text-sm font-medium text-gray-400">Whocoin Balance</label>
            <input
                type="number"
                id="balance"
                name="balance"
                placeholder="0"
                value={formData.balance}
                onChange={handleChange}
                className="w-full px-3 py-2 lg:px-4 lg:py-3 font-mono text-sm border rounded-xl bg-gray-200 border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit"
                min="0" // Minimum amount
                step="1" // Ensure whole numbers only
                required

            />
        </div>
        <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-400">Is this a member account?</label>
            <input
                type="checkbox"
                id="isMember"
                name="isMember"
                checked={formData.isMember}
                onChange={handleChange}
                className="mt-1"
            />
        </div>
        <div>
            <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-gray-400 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                Create Account
            </button>
        </div>
    </form>
  );
}
