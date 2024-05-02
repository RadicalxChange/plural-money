'use server'

import prisma from "@/db"
import { Account } from "@/types/account";
import { StagedTransaction, Transaction } from "@/types/transaction"

export async function createTransaction(data: StagedTransaction): Promise<Transaction> {

  const createdTransaction: Transaction = await prisma.transaction.create({
    data: {
      amount: +data.amount,
      message: data.message,
      sender_id: data.sender_id,
      recipient_id: data.recipient_id
    }
  })

  // Update sender balance
  const updatedSender: Account = await prisma.account.update({
    where: { id: data.sender_id },
    data: {
      balance: {
        decrement: +data.amount
      }
    },
  });

  // Update recipient balance
  const updatedRecipient: Account = await prisma.account.update({
    where: { id: data.recipient_id },
    data: {
      balance: {
        increment: +data.amount
      }
    },
  });

  return createdTransaction
}