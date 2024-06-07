import { Account } from "@/types/account";
import EditAccountsList from "./editAccountsList";
import { getAccounts } from "@/lib/getAccounts";
import { Claims } from "@auth0/nextjs-auth0";
import { getUser } from "@/lib/getUser";

export default async function EditAccounts() {
    
  const user: Claims | null = await getUser()
  const accounts: Account[] = await getAccounts()

  return (
    <main className="px-4 pb-4 lg:px-24 pt-12 min-h-screen-minus-header">
      <h1 className="text-left text-lg mb-12">Edit Accounts</h1>
      {user?.account_is_admin ? (
        <EditAccountsList accounts={accounts} />
      ) : (
        <div className="space-y-4 max-w-2xl">
          <p>You are not authorized to view this page.</p>
        </div>
      )}
    </main>
  );
}