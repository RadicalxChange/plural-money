import MembersOnly from "@/components/membersOnly";
import { getAccounts } from "@/lib/getAccounts";
import { getTransactions } from "@/lib/getTransactions";
import { getUser } from "@/lib/getUser";
import { Account } from "@/types/account";
import { Transaction } from "@/types/transaction";
import { Claims } from "@auth0/nextjs-auth0";

export default async function Transactions() {
    
  const user: Claims | null = await getUser()
  const accounts: Account[] = await getAccounts()
  var transactions: Transaction[] = await getTransactions()

  const account: Account | null | undefined = user && accounts.find((account) => account.email === user.email)

  // checks if user has permission to view the transaction
  const isViewable = (transaction: Transaction) => {
    return account?.is_member || transaction.sender_id === user?.account_id || transaction.recipient_id === user?.account_id
  };

  const getName = (thisId: number) => {
    const thisAccount: Account | undefined = accounts.find((account) => account.id === thisId)
    return thisAccount ? thisAccount.name : "Unknown"
  };

  return (
    <main className="px-4 pb-4 lg:px-24 pt-12 min-h-screen-minus-header">
      <h1 className="text-left text-lg mb-12">Transactions</h1>
      {!account?.is_member ? (
        <p className="max-w-5xl text-left text-sm text-gray-300 mb-8">Transaction details are hidden if you&apos;re not a community member. If you&apos;d like to be registered as a community member, come to one of our onboarding sessions at Edge Esmeralda.</p>
      ) : null}
      <ul className="w-full max-w-5xl font-mono lg:text-sm text-xs border-b border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit rounded-xl border bg-gray-200 lg:p-4">
        {transactions.reverse().map((transaction, index) => {
          if (user && isViewable(transaction)) {
            return (
              <li key={index} className={`px-4 py-2 my-2 flex justify-between items-center ${transaction.sender_id === user.account_id ? 'text-red-400' : ''} ${transaction.recipient_id === user.account_id ? 'text-green-400' : ''}`}>
                  {getName(transaction.sender_id)} sent {transaction.amount} ∈dges to {getName(transaction.recipient_id)} for {transaction.message}
              </li>
            )
          } else {
            return (
               <li key={index} className="px-4 py-2 my-2 items-center">
                   <span className="text-gray-400">Community Member</span> sent {transaction.amount} ∈dges to <span className="text-gray-400">Community Member</span> for <span className="text-gray-400">Purpose</span>
               </li>
             )
          }
        })}
      </ul>
    </main>
  );
}
