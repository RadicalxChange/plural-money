"use client"
// Interactivity:
// - uses Context Provider useBalanceContext()

import { IBalanceContext, useBalanceContext } from "@/context/balanceContext";

export default function HeaderBalance() {
    const balanceContext: IBalanceContext | null = useBalanceContext();
    
    if (balanceContext && balanceContext.balance) {
        return (
            <p>Balance: {balanceContext.balance} ∈</p>
        );
    } else {
        return null
    }
}