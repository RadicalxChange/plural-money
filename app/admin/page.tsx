import { getUser } from "@/lib/getUser";
import { Claims } from "@auth0/nextjs-auth0";
import Link from "next/link";

export default async function Admin() {
    
  const user: Claims | null = await getUser()

  return (
    <main className="min-h-screen items-center border-b-2 border-white">
      <div className="w-full px-4 pb-4 lg:px-24 pt-12">
        <h1 className="text-left text-lg mb-12">Admin Actions</h1>
        {user && user.account_is_admin ? (
          <div className="w-full max-w-5xl font-mono lg:text-sm text-xs border-b border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit rounded-xl border bg-gray-200 lg:p-4">
            <Link href="/admin/createAccounts" className="block px-3 py-2 rounded hover:bg-gray-500 dark:hover:bg-gray-700">Create Accounts</Link>
            <Link href="/admin/editAccounts" className="block px-3 py-2 rounded hover:bg-gray-500 dark:hover:bg-gray-700">Edit Accounts</Link>
          </div>
        ) : (
          <div className="space-y-4 max-w-2xl">
            <p>You are not authorized to view this page.</p>
          </div>
        )}
      </div>
    </main>
  );
}
