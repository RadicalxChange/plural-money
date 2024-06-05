import { Account } from "@/types/account";
import EditAccountsList from "./editAccountsList";
import { getAccounts } from "@/lib/getAccounts";

export default async function EditAccounts() {
    
const accounts: Account[] = await getAccounts()

  return (
    <main className="px-4 pb-4 lg:px-24 pt-12 min-h-screen-minus-header">
      <h1 className="text-left text-lg mb-12">Edit Accounts</h1>
      <EditAccountsList accounts={accounts} />
    </main>
  );
}