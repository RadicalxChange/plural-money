'use client'

import { getUser } from '@/lib/getUser';
import { isValidAccount } from '@/types/account';
import { Claims } from '@auth0/nextjs-auth0';
import { useContext, useState, createContext, useMemo, useEffect } from 'react';

export interface IBalanceContext {
    balance: number | null,
    setBalance: React.Dispatch<
    React.SetStateAction<IBalanceContext['balance']>
    >
}

const BalanceContext = createContext<IBalanceContext | null>(null);

export const BalanceProvider = ({ 
    children
 }: React.PropsWithChildren<{}>) => {
  const [balance, setBalance] = useState<IBalanceContext['balance']>(null)

  const value = useMemo(() => ({balance, setBalance}), [balance])

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
                setBalance(data.account.balance)
              }
          } else {
              throw new Error('Failed to fetch data')
          }
      }
    })();
  }, []);

  return (
    <BalanceContext.Provider value={value}>
      {children}
    </BalanceContext.Provider>
  );
};

export const useBalanceContext = () => useContext(BalanceContext);
