'use server'

import prisma from "@/db"
import { Account, AccountFormState } from "@/types/account"
import { sendMail } from "./sendMail"

export async function createAccount(data: AccountFormState): Promise<Account> {

  const createdAccount: Account = await prisma.account.create({
    data: {
      name: data.name,
      email: data.email,
      balance: +data.balance,
      is_member: data.isMember,
      is_admin: false,
    }
  })

  // send email to recipient
  sendMail(createdAccount)

  return createdAccount
}