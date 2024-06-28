import { getUser } from "@/lib/getUser";
import { Claims } from "@auth0/nextjs-auth0";
import { getAccounts } from "@/lib/getAccounts";
import { Account } from "@/types/account";
import { Listing } from "@/types/listing";
import { getListings } from "@/lib/getListings";
import MembersOnly from "@/components/membersOnly";
import ListingsPage from "./components/listingsPage";

export default async function ListingsPageRoot() {
    
  const user: Claims | null = await getUser()
  const accounts: Account[] = await getAccounts()
  const listings: Listing[] = await getListings()

  return (
    <main className="px-4 pb-4 lg:px-24 pt-12 min-h-screen-minus-header">
      <h1 className="text-left text-lg mb-12">Listings</h1>
      {user && user.account_id ? (
        <ListingsPage
          user={user}
          accounts={accounts}
          listings={listings.filter(listings => listings.status !== "delisted" || listings.author_id === user.account_id)}
        />
      ) : (
        <MembersOnly />
      )}
    </main>
  );
}