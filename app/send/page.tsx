import { Account } from "@/types/account";
import { getAccounts } from '@/lib/getAccounts';
import TransactionForm from './transactionForm';
import { Claims } from "@auth0/nextjs-auth0";
import { getUser } from "@/lib/getUser";
import MembersOnly from "@/components/membersOnly";

export default async function Send() {
  // Load current user session and account list
  const user: Claims | null = await getUser()
  let accounts: Account[] = [];

  if (user) {
    const allAccounts: Account[] = await getAccounts()
    accounts = allAccounts.filter(account => account.id !== user.id)
  }

  return (
    <main className="flex min-h-screen flex-col items-center border-b-2 border-white">
      <div className="w-full px-4 pb-4 lg:px-24 pt-12">
        <h1 className="text-left text-lg mb-12">Send ∈dges</h1>
        {user && user.account_is_member ? (
          <TransactionForm user={user} accounts={accounts} />
        ) : (
          <MembersOnly />
        )}
      </div>
    </main>
  );
}
