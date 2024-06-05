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
    <main className="px-4 pb-4 lg:px-24 pt-12 min-h-screen-minus-header">
      <h1 className="text-left text-lg mb-12">Send ∈dges</h1>
      {user && user.account_id ? (
        <TransactionForm user={user} accounts={accounts} />
      ) : (
        <MembersOnly />
      )}
    </main>
  );
}
