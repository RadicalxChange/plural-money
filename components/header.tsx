import Link from 'next/link'
import { getUser } from '@/lib/getUser';
import { Claims } from '@auth0/nextjs-auth0';
import { getAccount } from '@/lib/getAccount';
import { Account } from '@/types/account';
import SignInButton from './signInButton';

export default async function Header() {
    
    const user: Claims | null = await getUser()
    const account: Account | null = user && await getAccount(user.email)
    
    return (
        <header className="z-10 w-full font-mono sticky top-0 p-4 bg-black bg-opacity-100 border-b border-gray-200">
            <div className="w-full mx-4 flex justify-between items-center">
                <div className="flex">
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
                {user ? (
                    <Link href="/profile" className="mx-8 px-3 rounded hover:bg-gray-700">
                        <p className="font-semibold">{user.name}</p>
                        {account ? (
                            <p>Balance: {account.balance} Whocoins</p>
                        ) : null}
                    </Link>
                ) : (
                    <div className="px-4">
                        <SignInButton />
                    </div>
                )}
            </div>
        </header>
    );
}