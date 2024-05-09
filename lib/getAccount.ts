import 'server-only'

import prisma from "@/db"
import { Account } from "@/types/account"

export async function getAccount(email: string): Promise<Account | null> {

  const account: Account | null = await prisma.account.findUnique({
    where: {
      email: email,
    }
  })

  return account
}