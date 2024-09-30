'use client'

import { useState, ChangeEvent, FormEvent } from 'react'
import { Account, OnboardFormState } from "@/types/account";
import styles from "@/styles/form.module.css"
import { Claims } from '@auth0/nextjs-auth0';
import { submitOnboardingForm } from '@/lib/submitOnboardingForm';
import { redirectHandler } from '@/lib/redirectHandler';

export default function OnboardForm({
  user,
  account
}: {
  user: Claims,
  account: Account | null
}) {

  const nameOrUsername: string = user.name === user.email && user.username ? user.username : user.name

  // State hook to store form field values
  const [formData, setFormData] = useState<OnboardFormState>({
    name: account?.name || nameOrUsername,
    email: account?.email || user.email,
    agreedRules: false,
    paidFee: false
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

    console.log("Submitting onboarding form:", formData);
    submitOnboardingForm(formData).then(account => {
        // Handle the created account, e.g., update state, log, etc.
        console.log(account)
        redirectHandler('/')
      }).catch(error => {
        // Handle potential errors
        console.error("Error submitting form:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl" autoComplete="off">
      <p className="text-sm mb-6">Get onboarded to get the most out of your ∈dges.</p>
      <p className="text-sm mb-6">Venmo $20 to @matthew-prewitt-1 and submit the following attestations, and the admins will verify your account and credit you with 100 ∈.</p>
        <div className="flex align-center min-h-12 lg:min-h-10">
            <input
                type="checkbox"
                id="agreedRules"
                name="agreedRules"
                checked={formData.agreedRules}
                onChange={handleChange}
                className="mr-3"
                required
            />
            <label htmlFor="agreedRules" className="inline-block my-auto text-sm font-medium text-gray-600 dark:text-gray-400">I have read and agree to the <a href='/rules' className="underline hover:no-underline">rules</a>.</label>
        </div>
        <div className="flex align-center min-h-12 lg:min-h-10">
            <input
                type="checkbox"
                id="paidFee"
                name="paidFee"
                checked={formData.paidFee}
                onChange={handleChange}
                className="mr-3"
                required
            />
            <label htmlFor="paidFee" className="inline-block my-auto text-sm font-medium text-gray-600 dark:text-gray-400">I have paid $20 to the secretary, either by venmo @matthew-prewitt-1 or in person.</label>
        </div>
        <div>
            <button
                type="submit"
                className={styles.formButton}
            >
                Submit
            </button>
        </div>
    </form>
  );
}
