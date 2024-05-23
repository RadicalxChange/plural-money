"use client"

import Link from 'next/link'
import Image from 'next/image'
import { getUser } from '@/lib/getUser';
import { Claims } from '@auth0/nextjs-auth0';
import { useEffect, useState } from 'react';
import { Account, isValidAccount } from '@/types/account';
import toggleMobileNav from '@/lib/toggleMobileNav';

export default function Header() {
    const [user, setUser] = useState<Claims | null>(null);
    const [account, setAccount] = useState<Account | null>(null);
  
    useEffect(() => {
      (async () => {
        const loggedInUser: Claims | null = await getUser()
        if (loggedInUser) {
            setUser(loggedInUser)
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
        <header className="z-10 w-full font-mono sticky top-0 p-4 bg-black bg-opacity-100 border-b border-gray-200">
            <div className="w-full flex justify-between items-center">
                <div className="lg:flex hidden">
                    <Link href="/" className="px-3 py-2 rounded hover:bg-gray-700">Home</Link>
                    {account ? (
                        <Link href="/participants" className="px-3 py-2 rounded hover:bg-gray-700">Participants</Link>
                    ) : null}
                    {account ? (
                        <Link href="/transactions" className="px-3 py-2 rounded hover:bg-gray-700">Transactions</Link>
                    ) : null}
                    {account && account.balance !== 0 ? (
                        <Link href="/send" className="px-3 py-2 rounded hover:bg-gray-700">Send</Link>
                    ) : null}
                    {account ? (
                        <Link href="/rules" className="px-3 py-2 rounded hover:bg-gray-700">Rules</Link>
                    ) : null}
                    {account && account.is_admin ? (
                        <Link href="/admin" className="px-3 py-2 rounded hover:bg-gray-700">Admin</Link>
                    ) : null}
                </div>
                <button onClick={toggleMobileNav} className="lg:hidden py-2">
                    <Image id="menu-button-image" src="/hamburger-menu.svg" alt="menu" width="32" height="32" />
                </button>
                {user ? (
                    <Link href="/profile" className="lg:px-3 rounded hover:bg-gray-700 lg:text-base text-xs">
                        <p className="lg:font-semibold">{user.name}</p>
                        {account && account.balance ? (
                            <p>Balance: {account.balance} ∈</p>
                        ) : null}
                    </Link>
                ) : (
                    <Link href="/signIn" className="lg:px-3 py-2 rounded hover:bg-gray-700 lg:text-base text-sm">Sign In</Link>
                )}
            </div>
        </header>
    );
}