'use client'

import { ChangeEvent, FormEvent, useState } from 'react'
import { Account } from "@/types/account";
import Image from 'next/image'
import { updateAccount } from '@/lib/updateAccount';

export default function EditAccountsList({
    accounts
  }: {
    accounts: Account[]
  }) {
    
    const [editableAccounts, setEditableAccounts] = useState<Account[]>(accounts)
    const [editedAccount, setEditedAccount] = useState<Account | null>(null)

    const handleEdit = (account: Account) => {
        setEditedAccount(account)
    };

    const handleSave = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()  // Prevent the default form submission behavior

        if (!editedAccount) throw new Error("no account is selected")

        const updatedAccounts = editableAccounts.map(account =>
            account.id === editedAccount.id ? editedAccount : account
        );
        setEditableAccounts(updatedAccounts)

        console.log("Updating account")
        updateAccount(editedAccount).then(updatedAccount => {
            // Handle the created account, e.g., update state, log, etc.
            console.log(updatedAccount)
        }).catch(error => {
            // Handle potential errors
            console.error("Error updating account:", error)
        });
        console.log(editedAccount)
        setEditedAccount(null)
    };

    const handleCancel = () => {
        setEditedAccount(null)
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (!editedAccount) throw new Error("no account is selected")

        setEditedAccount({ ...editedAccount, balance: +event.target.value })
    };

    return (
        <div>
            {editableAccounts ? (
                <ul className="w-full max-w-5xl font-mono text-sm border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit rounded-xl border bg-gray-200 lg:p-4">
                    {editableAccounts.map((account, index) => (
                        <li key={index} className="px-4 py-2 my-2 flex justify-between items-center">
                            <span className="flex-1 text-left">{account.name}</span>
                            {editedAccount && editedAccount.id === account.id ? (
                                <form onSubmit={handleSave} className="flex items-center">
                                    <input
                                    type="number"
                                    id="balance"
                                    name="balance"
                                    value={editedAccount.balance.toString()}
                                    onChange={handleChange}
                                    className="text-black font-bold w-20 text-right mr-2"
                                    min="1" // Minimum amount
                                    step="1" // Ensure whole numbers only
                                    />
                                    <span className="mr-4"> ∈</span>
                                    <button type="submit" className="bg-green-500 text-white px-2 py-1 rounded mr-2">Save</button>
                                    <button type="button" onClick={handleCancel} className="bg-red-500 text-white px-2 py-1 rounded">Cancel</button>
                                </form>
                            ) : (
                            <>
                                <span className="mr-4">{account.balance} ∈</span>
                                <button type="button" onClick={() => handleEdit(account)} className="text-white px-2 py-1 rounded">
                                    <Image src="/edit-pencil.svg" alt="edit" width="32" height="32" />
                                </button>
                            </>
                            )}
                        </li>
                    ))}
                </ul>
            ) : null}
        </div>
    );
}
