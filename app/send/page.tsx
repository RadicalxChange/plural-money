import { Account } from "@/types/account";
import { getUser } from "@/lib/user";
import { getAccounts } from '@/lib/getAccounts';
import TransactionForm from './transactionForm';

export default async function Send() {
  // Load current user session and account list
  const user: Account = getUser()
  const allAccounts: Account[] = await getAccounts()
  const accounts: Account[] = allAccounts.filter(account => account.id !== user.id)

  return (
    <main className="flex min-h-screen flex-col items-center border-b-2 border-white">
      <div className="w-full px-24 pb-24 pt-12">
        <h1 className="text-left text-lg mb-12">Send Whocoin</h1>
        <TransactionForm user={user} accounts={accounts} />
      </div>
    </main>
  );
}
