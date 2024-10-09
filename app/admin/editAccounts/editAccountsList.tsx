'use client'

import { ChangeEvent, FormEvent, useState } from 'react'
import { Account } from "@/types/account";
import Image from 'next/image'
import { updateAccount } from '@/lib/updateAccount';
import styles from "@/styles/contents.module.css";

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

        const value = event.target.type === 'checkbox' ? (event.target as HTMLInputElement).checked : +event.target.value;
        const name = event.target.name;

        setEditedAccount(prev => ({
            ...prev!,
            [name]: value
        }));
    };

    return (
        <div>
            {editableAccounts ? (
                <ul className={styles.contentBox}>
                    {editableAccounts.map((account, index) => (
                        <li key={index} className="px-2 lg:px-4 py-2 my-2">
                            <div className="flex justify-between items-center">
                                <span className="flex-1 text-left mr-4 lg:mr-0">{account.name}</span>
                                {editedAccount && editedAccount.id === account.id ? null : (
                                    <>
                                    <span className="mr-2 lg:mr-4">{account.balance} ∈</span>
                                    <button type="button" onClick={() => handleEdit(account)} className="text-white lg:px-2 lg:py-1 rounded">
                                        <Image src="/edit-pencil.svg" alt="edit" width="32" height="32" />
                                    </button>
                                    </>
                                )}
                            </div>
                            {editedAccount && editedAccount.id === account.id ? (
                                <form onSubmit={handleSave} className="px-2 lg:px-4 pt-2 mt-2">
                                    <div className="flex justify-between items-center mb-4">
                                        <div>
                                            <label className="inline-flex items-center mr-4">
                                                <input
                                                    type="checkbox"
                                                    name="is_member"
                                                    checked={editedAccount.is_member}
                                                    onChange={handleChange}
                                                />
                                                <span className="ml-2">Member</span>
                                            </label>
                                            <label className="inline-flex items-center mr-4">
                                                <input
                                                    type="checkbox"
                                                    name="pending_approval"
                                                    checked={editedAccount.pending_approval}
                                                    onChange={handleChange}
                                                />
                                                <span className="ml-2">Pending</span>
                                            </label>
                                            <label className="inline-flex items-center mr-4">
                                                <input
                                                    type="checkbox"
                                                    name="is_admin"
                                                    checked={editedAccount.is_admin}
                                                    onChange={handleChange}
                                                />
                                                <span className="ml-2">Admin</span>
                                            </label>
                                        </div>
                                        <label className="inline-flex items-center">
                                            <input
                                            type="number"
                                            id="balance"
                                            name="balance"
                                            value={editedAccount.balance.toString()}
                                            onChange={handleChange}
                                            className="text-black font-bold w-20 text-right mr-2"
                                            min="0" // Minimum amount
                                            step="1" // Ensure whole numbers only
                                            />
                                            <span className="ml-2">∈</span>
                                        </label>
                                    </div>
                                    <div className="text-center">
                                        <button type="submit" className="bg-green-500 text-white px-2 py-1 rounded mr-2">Save</button>
                                        <button type="button" onClick={handleCancel} className="bg-red-500 text-white px-2 py-1 rounded">Cancel</button>
                                    </div>
                                </form>
                            ) : null}
                        </li>
                    ))}
                </ul>
            ) : null}
        </div>
    );
}
