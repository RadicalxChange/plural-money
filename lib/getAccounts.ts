import 'server-only'

import prisma from "@/db"
import { Account } from "@/types/account"

export async function getAccounts(): Promise<Account[]> {

  const accounts: Account[] = await prisma.account.findMany()

  return accounts
}