"use client"
// Interactivity:
// - uses Context Provider useBalanceContext()

import { IBalanceContext, useBalanceContext } from "@/context/balanceContext";

export default function HeaderBalance({
    initialBalance
}: {
    initialBalance: number
}) {
    
    const balanceContext: IBalanceContext | null = useBalanceContext();
    
    return (
        <p>Balance: {balanceContext?.balance || initialBalance} ∈</p>
    );
}