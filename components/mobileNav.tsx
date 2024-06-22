import { Account } from "@/types/account";
import MobileNavButton from "./mobileNavButton";
import { Claims } from "@auth0/nextjs-auth0";
import { getUser } from "@/lib/getUser";
import { getAccount } from "@/lib/getAccount";

export default async function MobileNav() {
    
  const user: Claims | null = await getUser()
  const account: Account | null = user && await getAccount(user.email)

  return (
    <div id="mobile-nav" className="lg:hidden hidden z-10 fixed w-full p-4 min-h-screen-minus-header bg-gray-200 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:bg-black dark:from-inherit">
      <MobileNavButton text="Home" href="/" />
      {account ? (
        <MobileNavButton text="Participants" href="/participants" />
      ) : null}
      <MobileNavButton text="Transactions" href="/transactions" />
      {account && account.balance !== 0 ? (
        <MobileNavButton text="Send" href="/send" />
      ) : null}
      <MobileNavButton text="Rules" href="/rules" />
      <MobileNavButton text="Onboard" href="/onboard" />
      {account && account.is_admin ? (
        <MobileNavButton text="Admin" href="/admin" />
      ) : null}
    </div>
  );
}