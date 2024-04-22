import { getTransactions } from "@/lib/transactions";
import { getUser } from "@/lib/user";
import { Account } from "@/types/account";
import { Transaction } from "@/types/transaction";

export default function Transactions() {

  const user: Account = getUser()
  const transactions: Transaction[] = getTransactions()

  return (
    <main className="flex min-h-screen flex-col items-center border-b-2 border-white">
      <div className="w-full px-24 pb-24 pt-12">
        <h1 className="text-left text-lg mb-12">Transactions</h1>
        <ul className="w-full max-w-5xl font-mono text-sm border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit rounded-xl border bg-gray-200 lg:p-4">
          {transactions.map((transaction, index) => {
            return (
              <li key={index} className={`px-4 py-2 my-2 flex justify-between items-center ${transaction.sender.id === user.id ? 'text-red-400' : ''} ${transaction.recipient.id === user.id ? 'text-green-400' : ''}`}>
                  {transaction.sender.name} sent {transaction.amount} Whocoins to {transaction.recipient.name} for {transaction.message}
              </li>
            )
          })}
        </ul>
      </div>
    </main>
  );
}
