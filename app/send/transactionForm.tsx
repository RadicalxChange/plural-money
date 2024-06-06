'use client'

import { useState, ChangeEvent, FormEvent } from 'react'
import { Account, isValidAccount } from "@/types/account";
import { StagedTransaction, TransactionFormState } from "@/types/transaction";
import useClickOutside from '@/lib/useClickOutside';
import { createTransaction } from '@/lib/createTransaction';
import { Claims } from '@auth0/nextjs-auth0';
import { IBalanceContext, useBalanceContext } from '@/context/balanceContext';
import { redirectHandler } from '@/lib/redirectHandler';
import styles from "@/styles/form.module.css"

export default function TransactionForm({
  user,
  accounts
}: {
  user: Claims,
  accounts: Account[]
}) {
  // State hook to store form field values
  const [formData, setFormData] = useState<TransactionFormState>({
    name: '',
    email: '',
    amount: '',
    message: '',
    isTaxable: false
  });
  const [suggestions, setSuggestions] = useState<Account[]>([]);
  const [nameOrEmail, setNameOrEmail] = useState<string>('');
  const [recipient, setRecipient] = useState<Account | string | undefined>(undefined);
  const balanceContext: IBalanceContext | null = useBalanceContext();

  const senderAccount: Account | undefined = accounts.find((account) => account.id === user.account_id)

  // Handler for changes in form inputs
  const handleChangeForm = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = event.target;
    var value = target.type === 'checkbox' ? (target as HTMLInputElement).checked : target.value;
    const name = target.name;

    // prevent user from entering number less than 1 or greater than their balance
    if (name === "amount") {
      value = value ? Math.max(1, Math.min(senderAccount ? Math.floor(senderAccount.balance / (formData.isTaxable ? 2 : 1)) : Infinity, Number(value))).toString() : value;
    }
    
    // when user toggles isTaxable, update amount to ensure they aren't trying to send more than they have
    if (name === "isTaxable") {
      setFormData(prevFormData => ({
        ...prevFormData,
        amount: prevFormData.amount ? Math.max(1, Math.min(senderAccount ? Math.floor(senderAccount.balance / (value ? 2 : 1)) : Infinity, Number(prevFormData.amount))).toString() : prevFormData.amount,
      }))
    }

    setFormData(prevFormData => ({
        ...prevFormData,
        [name]: value,
    }));
  };

  // Handler for changes in NameOrEmail field
  const handleChangeNameOrEmail = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (recipient !== undefined) {
      setRecipient(undefined)
    }

    // Clear the form fields
    setFormData({
        name: '',
        email: '',
        amount: '',
        message: '',
        isTaxable: false
    });

    setNameOrEmail(event.target.value)
    
    // filter suggested recipient accounts based on user input
    if (user.account_is_member) {
      setSuggestions(accounts.filter(account => account.name.toLowerCase().includes(event.target.value.toLowerCase())));
    } else {
      setSuggestions(accounts.filter(account => account.is_member && account.name.toLowerCase().includes(event.target.value.toLowerCase())));
    }
  };

  // Handler for user selecting a suggested recipient name
  const handleSuggestionClick = (name: string) => {
    setNameOrEmail(name)
    setFormData(prev => ({ ...prev, name }));
    setSuggestions([]);
  };

  // Handler for user finalizing their recipient selection
  const handleNext = () => {
    const trimmedNameOrEmail: string = nameOrEmail.toLowerCase().trim()
    const recipientAccount: Account | undefined = accounts.find((account) => account.name === nameOrEmail || account.email === trimmedNameOrEmail)

    // non-members can only send to members
    if (!user.account_is_member && !recipientAccount?.is_member) {
      throw new Error("Please enter the name or email address of a registered community member.")
    } else if (recipientAccount) {
      setRecipient(recipientAccount);
      setFormData(prevFormData => ({
          ...prevFormData,
          name: recipientAccount.name,
          email: recipientAccount.email,
          isTaxable: !recipientAccount.is_member
      }));
      setNameOrEmail(recipientAccount.name)
   } else {
      const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (regex.test(trimmedNameOrEmail)) {
        setRecipient(trimmedNameOrEmail)
        setFormData(prevFormData => ({
            ...prevFormData,
            email: trimmedNameOrEmail,
            isTaxable: true
        }));
      } else {
        throw new Error("Please enter the name of a registered community member or a valid email address")
      }
    }
  };

  // Handler for closing the dropdown if user clicks outside of it
  const ref = useClickOutside(() => {
    setSuggestions([]);
  });

  // Function to handle form submission
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();  // Prevent the default form submission behavior

    // Create a new transaction
    const transactionData: StagedTransaction = {
      amount: +formData.amount,
      message: formData.message,
      sender_id: user.account_id,
      sender_name: senderAccount?.name || user.name,
      recipient_account: recipient && typeof recipient === 'object' ? recipient : null,
      recipient_email: formData.email,
      recipient_name: formData.name,
      is_taxable: formData.isTaxable
    }
    console.log("Creating a new transaction:", transactionData);

    createTransaction(transactionData).then(createdTransaction => {
      // Update credit balance in header using BalanceProvider
      if (balanceContext) {
        fetch('/api/auth/account?' + new URLSearchParams({
          email: user.email,
        })).then(res => {
          if (res.ok) {
              res.json().then(data =>{
                if (isValidAccount(data.account)) {
                  balanceContext.setBalance(data.account.balance)
                }
              })
          } else {
              throw new Error('Failed to fetch data')
          }
        })
      }
      console.log("Transaction completed");
      redirectHandler('/transactions')
    }).catch(error => {
      // Handle potential errors
      console.error("Error creating account:", error);
    });

    // Clear the form fields
    setRecipient(undefined)
    setNameOrEmail('')
    setFormData({
        name: '',
        email: '',
        amount: '',
        message: '',
        isTaxable: false
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl" autoComplete="off" ref={ref}>
        <div>
            <label htmlFor="nameOrEmail" className={styles.formLabel}>Send to</label>
            <input
                type="text"
                id="nameOrEmail"
                name="nameOrEmail"
                placeholder="Name or Email"
                value={nameOrEmail}
                onChange={handleChangeNameOrEmail}
                className={styles.formTextInput}
                required
            />
            {suggestions.length > 0 && (
              <ul className="mt-1 max-h-64 w-full overflow-auto border bg-gray-200 border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit rounded-md shadow-lg z-10">
                {suggestions.map((suggestion) => (
                  <li
                    key={suggestion.id}
                    className="px-4 py-2 hover:bg-gray-500 dark:hover:bg-gray-700 cursor-pointer"
                    onClick={() => handleSuggestionClick(suggestion.name)}
                  >
                    {suggestion.name}
                  </li>
                ))}
              </ul>
            )}
        </div>
        {!recipient ? (
          <div>
              <button
                  type="button"
                  onClick={() => handleNext()}
                  className={styles.formButton}
              >
                  Next
              </button>
          </div>
        ) : (
          <>
          {recipient && typeof recipient === 'string' ? (
            <div>
              <label htmlFor="name" className={styles.formLabel}>What&apos;s this person&apos;s name?</label>
              <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChangeForm}
                  className={styles.formTextInput}
                  required
              />
            </div>
          ) : null}
          <div>
              <label htmlFor="amount" className={styles.formLabel}>Amount of ∈dges</label>
              <input
                  type="number"
                  id="amount"
                  name="amount"
                  placeholder="0"
                  value={formData.amount}
                  onChange={handleChangeForm}
                  className={styles.formTextInput}
                  step="1" // Ensure whole numbers only
                  required
              />
          </div>
          <div>
              <label htmlFor="message" className={styles.formLabel}>What&apos;s it for?</label>
              <textarea
                  id="message"
                  name="message"
                  placeholder="Ex: maintaining the community garden"
                  value={formData.message}
                  onChange={handleChangeForm}
                  className={styles.formTextInput}
                  rows={3}
                  required
              ></textarea>
          </div>
          {recipient && typeof recipient === 'object' && recipient.is_member && senderAccount?.is_member ? (
            <div>
                <label htmlFor="isTaxable" className={styles.formLabel}>Is this payment for a non-perishable good or work on an unlisted private / personally-owned project?</label>
                <input
                    type="checkbox"
                    id="isTaxable"
                    name="isTaxable"
                    checked={formData.isTaxable}
                    onChange={handleChangeForm}
                    className="mt-1"
                />
            </div>
          ) : null}
          {formData.isTaxable ? (
            <>
            <p className="font-mono text-sm">Exit Tax: {formData.amount ? formData.amount + " ∈" : "100%"}</p>
            {formData.amount ? (<p className="font-mono text-sm">A total of {+formData.amount * 2} ∈ will be debited from your account.</p>) : null}
            </>
          ) : null}
          <div>
              <button
                  type="submit"
                  className={styles.formButton}
              >
                  Send
              </button>
          </div>
          </>
          )}
    </form>
  );
}
