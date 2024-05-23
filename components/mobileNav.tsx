"use client"

import { getUser } from "@/lib/getUser";
import toggleMobileNav from "@/lib/toggleMobileNav";
import { Account, isValidAccount } from "@/types/account";
import { Claims } from "@auth0/nextjs-auth0";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "@/styles/mobileNav.module.css"

export default function MobileNav() {
  const [account, setAccount] = useState<Account | null>(null);

  useEffect(() => {
    (async () => {
      const loggedInUser: Claims | null = await getUser()
      if (loggedInUser) {
          const res = await fetch('/api/auth/account?' + new URLSearchParams({
              email: loggedInUser.email,
          }))
          if (res.ok) {
              const data: any = await res.json()
              if (isValidAccount(data.account)) {
                  setAccount(data.account)
              }
          } else {
              throw new Error('Failed to fetch data')
          }
      }
    })();
  }, []);

  return (
    <div id="mobile-nav" className="lg:hidden hidden z-10 fixed w-full p-4 min-h-screen-minus-header bg-black">
      <button onClick={toggleMobileNav} className="w-full">
        <Link href="/" className={styles.navLink}>Home</Link>
      </button>
      {account ? (
        <button onClick={toggleMobileNav} className="w-full">
          <Link href="/participants" className={styles.navLink}>Participants</Link>
        </button>
      ) : null}
      {account ? (
        <button onClick={toggleMobileNav} className="w-full">
          <Link href="/transactions" className={styles.navLink}>Transactions</Link>
        </button>
      ) : null}
      {account && account.balance !== 0 ? (
        <button onClick={toggleMobileNav} className="w-full">
          <Link href="/send" className={styles.navLink}>Send</Link>
        </button>
      ) : null}
      {account ? (
        <button onClick={toggleMobileNav} className="w-full">
          <Link href="/rules" className={styles.navLink}>Rules</Link>
        </button>
      ) : null}
      {account && account.is_admin ? (
        <button onClick={toggleMobileNav} className="w-full">
          <Link href="/admin" className={styles.navLink}>Admin</Link>
        </button>
      ) : null}
    </div>
  );
}