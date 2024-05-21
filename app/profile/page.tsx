import MembersOnly from "@/components/membersOnly";
import SignOutButton from "@/components/signOutButton";
import { getAccount } from "@/lib/getAccount";
import { getUser } from "@/lib/getUser";
import { Account } from "@/types/account";
import { Claims } from "@auth0/nextjs-auth0";

export default async function Profile() {
    
  const user: Claims | null = await getUser()
  const account: Account | null = user && await getAccount(user.email)

  return (
    <main className="flex min-h-screen flex-col items-center border-b-2 border-white">
      <div className="w-full px-24 pb-24 pt-12">
        <h1 className="text-left text-lg mb-12">Your Profile</h1>
        {user ? (
          <div className="space-y-4">
            <div className="w-full max-w-5xl space-y-2 font-mono text-sm border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit rounded-xl border bg-gray-200 lg:p-4">
              <p>{user.name}</p>
              <p>{user.email}</p>
              {account ? (
                <div className="space-y-2">
                  <p>Balance: {account.balance}</p>
                  <p>Member: {user.account_is_member ? "Yes" : "No"}</p>
                  <p>Admin: {user.account_is_admin ? "Yes" : "No"}</p>
                </div>
              ) : null}
            </div>
            <SignOutButton user={user} />
          </div>
        ) : (
          <p>You're not signed in</p>
        )}
      </div>
    </main>
  );
}