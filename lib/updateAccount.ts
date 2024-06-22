'use server'

import prisma from "@/db"
import { Account } from "@/types/account"

export async function updateAccount(data: Account): Promise<Account> {

  const updatedAccount: Account = await prisma.account.update({
    where: {
      id: data.id,
    },
    data: {
      name: data.name,
      email: data.email,
      balance: +data.balance,
      is_member: data.is_member,
      is_admin: data.is_admin,
      pending_approval: data.pending_approval,
    }
  })

  return updatedAccount
}