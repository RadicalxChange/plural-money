import 'server-only'

import prisma from "@/db"
import { Transaction } from "@/types/transaction";

export async function getTransactions(): Promise<Transaction[]> {

  const transactions: Transaction[] = await prisma.transaction.findMany()

  return transactions
}