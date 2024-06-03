'use client'

import { useState, ChangeEvent, FormEvent } from 'react'
import { Account, isValidAccount } from "@/types/account";
import { StagedTransaction, TransactionFormState } from "@/types/transaction";
import useClickOutside from '@/lib/useClickOutside';
import { createTransaction } from '@/lib/createTransaction';
import { Claims } from '@auth0/nextjs-auth0';
import { IBalanceContext, useBalanceContext } from '@/context/balanceContext';
import { redirectHandler } from '@/lib/redirectHandler';

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
    message: ''
  });
  const [suggestions, setSuggestions] = useState<Account[]>([]);
  const [nameOrEmail, setNameOrEmail] = useState<string>('');
  const [recipient, setRecipient] = useState<Account | string | undefined>(undefined);
  const balanceContext: IBalanceContext | null = useBalanceContext();

  const senderAccount: Account | undefined = accounts.find((account) => account.id === user.account_id)

  // Handler for changes in form inputs
  const handleChangeForm = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    var { name, value } = event.target;

    // prevent user from entering number less than 1 or greater than their balance
    if (name === "amount") {
      value = value ? Math.max(1, Math.min(senderAccount ? senderAccount.balance : Infinity, Number(event.target.value))).toString() : value;
    }

    setFormData(prevFormData => ({
        ...prevFormData,
        [name]: value
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
        message: ''
    });

    setNameOrEmail(event.target.value)
    
    // filter suggested recipient accounts based on user input
    setSuggestions(accounts.filter(account => account.name.toLowerCase().includes(event.target.value.toLowerCase())));
  };

  // Handler for user selecting a suggested recipient name
  const handleSuggestionClick = (name: string) => {
    setNameOrEmail(name)
    setFormData(prev => ({ ...prev, name }));
    setSuggestions([]);
  };

  // Handler for user finalizing their recipient selection
  const handleNext = () => {
    const recipientAccount: Account | undefined = accounts.find((account) => account.name === nameOrEmail || account.email === nameOrEmail)

    if (recipientAccount) {
      setRecipient(recipientAccount);
      setFormData(prevFormData => ({
          ...prevFormData,
          name: recipientAccount.name,
          email: recipientAccount.email
      }));
      setNameOrEmail(recipientAccount.name)
    } else {
      const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (regex.test(nameOrEmail)) {
        setRecipient(nameOrEmail)
        setFormData(prevFormData => ({
            ...prevFormData,
            email: nameOrEmail
        }));
      } else {
        throw new Error("Please enter the name of a registered participant or a valid email address")
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
      recipient_id: recipient && typeof recipient === 'object' ? recipient.id : null,
      recipient_email: formData.email,
      recipient_name: formData.name
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
        message: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl" autoComplete="off" ref={ref}>
        <div>
            <label htmlFor="nameOrEmail" className="block text-sm font-medium text-gray-400">Send to</label>
            <input
                type="text"
                id="nameOrEmail"
                name="nameOrEmail"
                placeholder="Name or Email"
                value={nameOrEmail}
                onChange={handleChangeNameOrEmail}
                className="w-full px-3 py-2 lg:px-4 lg:py-3 font-mono text-sm border rounded-xl bg-gray-200 border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit"
                required
            />
            {suggestions.length > 0 && (
              <ul className="mt-1 max-h-64 w-full overflow-auto border bg-gray-200 border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit rounded-md shadow-lg z-10">
                {suggestions.map((suggestion) => (
                  <li
                    key={suggestion.id}
                    className="px-4 py-2 hover:bg-gray-900 cursor-pointer"
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
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-gray-400 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                  Next
              </button>
          </div>
        ) : (
          <>
          {recipient && typeof recipient === 'string' ? (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-400">What&apos;s this person&apos;s name?</label>
              <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChangeForm}
                  className="w-full px-3 py-2 lg:px-4 lg:py-3 font-mono text-sm border rounded-xl bg-gray-200 border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit"
                  required
              />
            </div>
          ) : null}
          <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-400">Amount of ∈dges</label>
              <input
                  type="number"
                  id="amount"
                  name="amount"
                  placeholder="0"
                  value={formData.amount}
                  onChange={handleChangeForm}
                  className="w-full px-3 py-2 lg:px-4 lg:py-3 font-mono text-sm border rounded-xl bg-gray-200 border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit"
                  step="1" // Ensure whole numbers only
                  required
              />
          </div>
          <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-400">What&apos;s it for?</label>
              <textarea
                  id="message"
                  name="message"
                  placeholder="Ex: maintaining the community garden"
                  value={formData.message}
                  onChange={handleChangeForm}
                  className="w-full px-3 py-2 lg:px-4 lg:py-3 font-mono text-sm border rounded-xl bg-gray-200 border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit"
                  rows={3}
                  required
              ></textarea>
          </div>
          <div>
              <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-gray-400 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                  Send
              </button>
          </div>
          </>
          )}
    </form>
  );
}
