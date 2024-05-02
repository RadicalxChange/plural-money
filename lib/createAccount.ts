'use server'

import prisma from "@/db"
import { Account, AccountFormState } from "@/types/account"

export async function createAccount(data: AccountFormState): Promise<Account> {

  const createdAccount: Account = await prisma.account.create({
    data: {
      name: data.name,
      balance: +data.balance,
      is_member: data.isMember,
      is_admin: false,
    }
  })

  return createdAccount
}