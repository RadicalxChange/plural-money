import Link from 'next/link'
import { getUser } from '@/lib/getUser';
import { Claims } from '@auth0/nextjs-auth0';
import { getAccount } from '@/lib/getAccount';
import { Account } from '@/types/account';

export default async function Header() {
    
    const user: Claims | null = await getUser()
    const account: Account | null = user && await getAccount(user.email)
    
    return (
        <header className="z-10 w-full font-mono sticky top-0 p-4 bg-black bg-opacity-100 border-b border-gray-200">
            <div className="w-full mx-4 flex justify-between items-center">
                <div className="flex">
                    <Link href="/" className="px-3 py-2 rounded hover:bg-gray-700">Participants</Link>
                    <Link href="/transactions" className="px-3 py-2 rounded hover:bg-gray-700">Transactions</Link>
                    <Link href="/send" className="px-3 py-2 rounded hover:bg-gray-700">Send</Link>
                    {user && user.account_is_admin ? (
                        <Link href="/admin" className="px-3 py-2 rounded hover:bg-gray-700">Admin</Link>
                    ) : null}
                </div>
                {user ? (
                    <div className="px-11">
                        <p className="font-semibold">{user.name}</p>
                        {account ? (
                            <p>Balance: {account.balance} Whocoins</p>
                        ) : null}
                    </div>
                ) : (
                    <a href="/api/auth/login">Sign In</a>
                )}
            </div>
        </header>
    );
}