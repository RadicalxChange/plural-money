'use server'

import prisma from "@/db"
import { Account, OnboardFormState } from "@/types/account"
import { updateAccount } from "./updateAccount"

export async function submitOnboardingForm(data: OnboardFormState): Promise<Account> {
    
    const existingAccount: Account | null = await prisma.account.findUnique({
        where: {
            email: data.email,
        }
    })

    if (existingAccount) {
        const updatedAccount: Account = await updateAccount({
            ...existingAccount,
            pending_approval: true
        })
        return updatedAccount
    } else {
        const createdAccount: Account = await prisma.account.create({
            data: {
                name: data.name,
                email: data.email,
                balance: 0,
                velocity: 0,
                is_member: false,
                pending_approval: true
            }
        })
        return createdAccount
    }
}