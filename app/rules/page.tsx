import MembersOnly from "@/components/membersOnly";
import { getAccounts } from "@/lib/getAccounts";
import { getUser } from "@/lib/getUser";
import { Account } from "@/types/account";
import { Claims } from "@auth0/nextjs-auth0";

export default async function Participants() {
    
  const user: Claims | null = await getUser()
  const accounts: Account[] = await getAccounts()

  return (
    <main className="flex min-h-screen flex-col items-center border-b-2 border-white">
      <div className="w-full px-4 pb-4 lg:px-24 pt-12">
        <h1 className="text-left text-lg mb-12">Rules</h1>
        {user && user.account_is_member ? (
          <div className="w-full max-w-5xl font-mono lg:text-sm text-xs border-b border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit rounded-xl border bg-gray-200 lg:p-4">
            <p className="px-4 py-1 my-1 flex justify-between items-center">Exit tax: 50%</p>
            <p className="px-4 py-1 my-1 flex justify-between items-center">Trust multiple: infinite</p>
            <p className="px-4 py-1 my-1 flex justify-between items-center">Min contribution: $100</p>
            <p className="px-4 py-1 my-1 flex justify-between items-center">Secretary: Matt</p>
          </div>
        ) : (
          <MembersOnly />
        )}
      </div>
    </main>
  );
}
