import MembersOnly from "@/components/membersOnly";
import { getAccounts } from "@/lib/getAccounts";
import { getUser } from "@/lib/getUser";
import { Account } from "@/types/account";
import { Claims } from "@auth0/nextjs-auth0";
import styles from "@/styles/contents.module.css";

export default async function Participants() {
    
  const user: Claims | null = await getUser()
  const accounts: Account[] = await getAccounts()

  return (
    <main className="px-4 pb-4 lg:px-24 pt-12 min-h-screen-minus-header">
      <h1 className="text-left text-lg mb-12">{`{ ∈dge holders }`}</h1>
      {user && user.account_is_member ? (
        <ul className={styles.contentBox}>
          <li className="border-b px-4 pb-2 mb-4 grid grid-cols-3 items-center" style={{ gridTemplateColumns: '2fr 2fr 1fr' }}>
              Name <span className="font-bold text-center mx-2">Velocity</span> <span className="font-bold text-right">Balance</span>
          </li>
          {accounts.sort((a: Account, b: Account) => {
            let x = a.name.toLowerCase();
            let y = b.name.toLowerCase();
            if (x < y) {return -1;}
            if (x > y) {return 1;}
            return 0;
          }).map((account, index) => {
            return (
              <li key={index} className={`px-4 py-2 my-2 grid grid-cols-3 items-center ${account.id === user.account_id ? 'text-blue-400' : ''}`} style={{ gridTemplateColumns: '2fr 2fr 1fr' }}>
                  {account.name} <span className="font-bold text-center mx-2">{account.velocity}</span> <span className="font-bold text-right">{account.balance + " " + (account.is_member ? "∈" : "∉")}</span>
              </li>
            )
          })}
        </ul>
      ) : (
        <MembersOnly />
      )}
    </main>
  );
}
