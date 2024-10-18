'use server'

import prisma from "@/db"
import { Account } from "@/types/account"
import { sendMail } from "./sendMail"

export async function updateAccount(data: Account): Promise<Account> {

  const account: Account | null = await prisma.account.findUnique({
    where: {
      id: data.id,
    }
  })

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

  if ((account?.pending_approval && !updatedAccount.pending_approval) || (!account?.is_member && updatedAccount.is_member)) {
    // send email to recipient
    sendMail(updatedAccount)
  }

  return updatedAccount
}