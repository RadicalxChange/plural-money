import Link from 'next/link'
import { getUser } from '@/lib/getUser';
import { Claims } from '@auth0/nextjs-auth0';
import { Account } from '@/types/account';
import MenuButton from './menuButton';
import { getAccount } from '@/lib/getAccount';
import HeaderBalance from './headerBalance';
import styles from "@/styles/header.module.css"

export default async function Header() {
    
    const user: Claims | null = await getUser()
    const account: Account | null = user && await getAccount(user.email)
    
    return (
        <header className="z-10 w-full font-mono sticky top-0 p-4 bg-gray-200 dark:bg-black bg-opacity-100 border-b border-gray-200">
            <div className="w-full flex justify-between items-center">
                <div className="lg:flex hidden">
                    <Link href="/" className={styles.headerLink}>Home</Link>
                    {account ? (
                        <Link href="/participants" className={styles.headerLink}>Participants</Link>
                    ) : null}
                    <Link href="/transactions" className={styles.headerLink}>Transactions</Link>
                    {account ? (
                        <Link href="/listings" className={styles.headerLink}>Listings</Link>
                    ) : null}
                    {account ? (
                        <Link href="/send" className={styles.headerLink}>Send</Link>
                    ) : null}
                    <Link href="/rules" className={styles.headerLink}>Rules</Link>
                    <Link href="/onboard" className={styles.headerLink}>Onboard</Link>
                    {account && account.is_admin ? (
                        <Link href="/admin" className={styles.headerLink}>Admin</Link>
                    ) : null}
                </div>
                <MenuButton />
                {user ? (
                    <Link href="/profile" className="lg:px-3 rounded hover:bg-gray-500 dark:hover:bg-gray-700 lg:text-base text-xs">
                        <p className="lg:font-semibold">{account ? account.name : user.name}</p>
                        {account ? (
                            <HeaderBalance initialBalance={account.balance} />
                        ) : null}
                    </Link>
                ) : (
                    <Link href="/signIn" className={styles.headerLink + " lg:text-base text-sm"}>Sign In</Link>
                )}
            </div>
        </header>
    );
}