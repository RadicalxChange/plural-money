import { getUser } from "@/lib/getUser";
import { Claims } from "@auth0/nextjs-auth0";
import styles from "@/styles/contents.module.css";
import { getAccounts } from "@/lib/getAccounts";
import { Account } from "@/types/account";
import { Listing } from "@/types/listing";
import { getListings } from "@/lib/getListings";

export default async function Listings() {
    
  const user: Claims | null = await getUser()
  const accounts: Account[] = await getAccounts()
  const listings: Listing[] = await getListings()

const getName = (thisId: number) => {
    const thisAccount: Account | undefined = accounts.find((account) => account.id === thisId)
    return thisAccount ? thisAccount.name : "Unknown"
  };


  return (
    <main className="px-4 pb-4 lg:px-24 pt-12 min-h-screen-minus-header">
      <h1 className="text-left text-lg mb-12 ">Listings</h1>
      <ul className={styles.contentBox}>
        <button className="px-4 py-2 my-4 items-center rounded hover:bg-gray-500 dark:hover:bg-gray-700">+ Create new listing</button>
        {user && listings.reverse().map((listing, index) => {
            return (
              <li key={index} className={`px-4 py-2 my-4 items-center ${listing.author_id === user.account_id ? 'text-blue-400' : ''}`}>
                    <div className="flex justify-between">
                        <span className="mr-4">{listing.message}</span>
                        <span>{listing.reward} ∈</span>
                    </div>
                    <p className="mt-2 text-xs">{listing.type} posted by {getName(listing.author_id)}</p>
              </li>
            )
        })}
      </ul>
    </main>
  );
}