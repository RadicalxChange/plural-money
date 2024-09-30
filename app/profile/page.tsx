import SignOutButton from "@/components/signOutButton";
import { getAccount } from "@/lib/getAccount";
import { getUser } from "@/lib/getUser";
import { Account } from "@/types/account";
import { Claims } from "@auth0/nextjs-auth0";

export default async function Profile() {
    
  const user: Claims | null = await getUser()
  const account: Account | null = user && await getAccount(user.email)

  return (
    <main className="px-4 pb-4 lg:px-24 pt-12 min-h-screen-minus-header">
      <h1 className="text-left text-lg mb-12">Your Profile</h1>
      {user ? (
        <div className="space-y-4">
          <div className="w-full max-w-5xl font-mono space-y-2 lg:text-sm text-xs border-b border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit rounded-xl border bg-gray-200 lg:p-4">
            <p className="px-4 py-1 my-1 flex justify-between items-center">{account ? account.name : user.name}</p>
            <p className="px-4 py-1 my-1 flex justify-between items-center">{user.email}</p>
            {account ? (
              <div className="space-y-2">
                <p className="px-4 py-1 my-1 flex justify-between items-center">Balance: {account.balance} ∈</p>
                <p className="px-4 py-1 my-1 flex justify-between items-center">Velocity: {account.velocity}</p>
                <p className="px-4 py-1 my-1 flex justify-between items-center">Member: {account.is_member ? "Yes" : account.pending_approval ? "Pending approval" : "No"}</p>
                {user.account_is_admin ? (
                  <p className="px-4 py-1 my-1 flex justify-between items-center">Admin: {user.account_is_admin ? "Yes" : "No"}</p>
                ) : null}
              </div>
            ) : null}
          </div>
          <SignOutButton user={user} />
        </div>
      ) : (
        <p>You are not signed in</p>
      )}
    </main>
  );
}
