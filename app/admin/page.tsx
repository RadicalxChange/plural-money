import { Account, AccountFormState } from "@/types/account";
import { getUser } from "@/lib/user";
import AccountForm from "./accountForm";
import { createAccount } from "@/lib/createAccount";

export default async function Send() {
  // Load current user session
  const user: Account = getUser()

  return (
    <main className="flex min-h-screen flex-col items-center border-b-2 border-white">
      <div className="w-full px-24 pb-24 pt-12">
        <h1 className="text-left text-lg mb-12">Create a new Account</h1>
        <AccountForm />
      </div>
    </main>
  );
}
