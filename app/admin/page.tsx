import Link from "next/link";

export default async function Admin() {

  return (
    <main className="min-h-screen items-center border-b-2 border-white">
      <div className="w-full px-24 pb-24 pt-12">
        <h1 className="text-left text-lg mb-12">Admin Actions</h1>
        <div className="w-full max-w-5xl space-y-2 font-mono text-sm border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit rounded-xl border bg-gray-200 lg:p-4">
          <Link href="/admin/createAccounts" className="block px-3 py-2 rounded hover:bg-gray-700">Create Accounts</Link>
          <Link href="/admin/editAccounts" className="block px-3 py-2 rounded hover:bg-gray-700">Edit Accounts</Link>
        </div>
      </div>
    </main>
  );
}
