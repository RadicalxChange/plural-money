import { Account } from "@/types/account";
import EditAccountsList from "./editAccountsList";
import { getAccounts } from "@/lib/getAccounts";

export default async function EditAccounts() {
    
const accounts: Account[] = await getAccounts()

  return (
    <main className="flex min-h-screen flex-col items-center border-b-2 border-white">
      <div className="w-full px-24 pb-24 pt-12">
        <h1 className="text-left text-lg mb-12">Edit Accounts</h1>
        <EditAccountsList accounts={accounts} />
      </div>
    </main>
  );
}