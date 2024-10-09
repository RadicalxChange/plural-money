'use client'

import { useState, ChangeEvent, FormEvent } from 'react'
import { AccountFormState } from "@/types/account";
import { createAccount } from '@/lib/createAccount';
import styles from "@/styles/form.module.css"

export default function CreateAccountForm() {
  // State hook to store form field values
  const [formData, setFormData] = useState<AccountFormState>({
    name: '',
    email: '',
    balance: '',
    isMember: true,
    isAdmin: false
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

    // ignore case and whitespace
    const finalData = {
      ...formData,
      email: formData.email.toLowerCase().trim()
    }

    console.log("Creating a new account:", finalData);
    createAccount(finalData).then(createdAccount => {
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
        isMember: true,
        isAdmin: false
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl" autoComplete="off">
        <div>
            <label htmlFor="name" className={styles.formLabel}>Name</label>
            <input
                type="text"
                id="name"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className={styles.formTextInput}
                required
            />
        </div>
        <div>
          <label htmlFor="email" className={styles.formLabel}>Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className={styles.formTextInput}
            required
          />
        </div>
        <div>
            <label htmlFor="balance" className={styles.formLabel}>∈dges</label>
            <input
                type="number"
                id="balance"
                name="balance"
                placeholder="0"
                value={formData.balance}
                onChange={handleChange}
                className={styles.formTextInput}
                min="0" // Minimum amount
                step="1" // Ensure whole numbers only
                required

            />
        </div>
        <div>
            <label htmlFor="isMember" className={styles.formLabel}>Is this a member account?</label>
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
            <label htmlFor="isAdmin" className={styles.formLabel}>Is this an admin?</label>
            <input
                type="checkbox"
                id="isAdmin"
                name="isAdmin"
                checked={formData.isAdmin}
                onChange={handleChange}
                className="mt-1"
            />
        </div>
        <div>
            <button
                type="submit"
                className={styles.formButton}
            >
                Create Account
            </button>
        </div>
    </form>
  );
}
