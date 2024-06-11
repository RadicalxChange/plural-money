import { getAccounts } from "@/lib/getAccounts";
import { getUser } from "@/lib/getUser";
import { Account } from "@/types/account";
import { Claims } from "@auth0/nextjs-auth0";
import Rules from "@/content/rules.mdx"
import styles from "@/styles/contents.module.css";

export default async function Participants() {
    
  const user: Claims | null = await getUser()
  const accounts: Account[] = await getAccounts()

  return (
    <main className="px-4 pb-4 lg:px-24 pt-12 min-h-screen-minus-header">
      <h1 className="text-left text-lg mb-12">Rules</h1>
      <div className={styles.contentBox}>
        <Rules />
      </div>
    </main>
  );
}
