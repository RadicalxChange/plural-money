import { Claims } from "@auth0/nextjs-auth0";
import CreateAccountForm from "./createAccountForm";
import { getUser } from "@/lib/getUser";

export default async function CreateAccounts() {
    
  const user: Claims | null = await getUser()

  return (
    <main className="px-4 pb-4 lg:px-24 pt-12 min-h-screen-minus-header">
      <h1 className="text-left text-lg mb-12">Create a new Account</h1>
      {user?.account_is_admin ? (
        <CreateAccountForm />
      ) : (
        <div className="space-y-4 max-w-2xl">
          <p>You are not authorized to view this page.</p>
        </div>
      )}
    </main>
  );
}