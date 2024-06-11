import { getUser } from "@/lib/getUser";
import { Claims } from "@auth0/nextjs-auth0";
import Link from "next/link";
import styles from "@/styles/contents.module.css";

export default async function Admin() {
    
  const user: Claims | null = await getUser()

  return (
    <main className="min-h-screen items-center border-b-2 border-white">
      <div className="w-full px-4 pb-4 lg:px-24 pt-12">
        <h1 className="text-left text-lg mb-12">Admin Actions</h1>
        {user && user.account_is_admin ? (
          <div className={styles.contentBox}>
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
