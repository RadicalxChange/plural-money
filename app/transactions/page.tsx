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
  const transactions: Transaction[] = await getTransactions()

  const getName = (thisId: number) => {
    const thisAccount: Account | undefined = accounts.find((account) => account.id === thisId)
    return thisAccount ? thisAccount.name : "Unknown"
  };

  return (
    <main className="flex min-h-screen flex-col items-center border-b-2 border-white">
      <div className="w-full px-24 pb-24 pt-12">
        <h1 className="text-left text-lg mb-12">Transactions</h1>
        {user && user.account_is_member ? (
          <ul className="w-full max-w-5xl font-mono text-sm border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit rounded-xl border bg-gray-200 lg:p-4">
            {transactions.reverse().map((transaction, index) => {
              return (
                <li key={index} className={`px-4 py-2 my-2 flex justify-between items-center ${transaction.sender_id === user.account_id ? 'text-red-400' : ''} ${transaction.recipient_id === user.account_id ? 'text-green-400' : ''}`}>
                    {getName(transaction.sender_id)} sent {transaction.amount} ∈dges to {getName(transaction.recipient_id)} for {transaction.message}
                </li>
              )
            })}
          </ul>
        ) : (
          <MembersOnly />
        )}
      </div>
    </main>
  );
}
