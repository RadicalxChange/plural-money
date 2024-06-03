'use server'

import prisma from "@/db"
import { Account } from "@/types/account";
import { StagedTransaction, Transaction } from "@/types/transaction"

// TODO: handle errors
export async function createTransaction(data: StagedTransaction): Promise<Transaction> {

  let recipientId: number;

  if (data.recipient_id) {
    // If recipient account exists, update recipient balance
    const updatedRecipient: Account = await prisma.account.update({
      where: { id: data.recipient_id },
      data: {
        balance: {
          increment: +data.amount
        }
      },
    });
    recipientId = data.recipient_id
  } else {
    // if recipient account does not exist, create new non-member account
    const createdAccount: Account = await prisma.account.create({
      data: {
        name: data.recipient_name,
        email: data.recipient_email,
        balance: +data.amount,
        is_member: false,
        is_admin: false,
      }
    })
    recipientId = createdAccount.id
  }

  const createdTransaction: Transaction = await prisma.transaction.create({
    data: {
      amount: +data.amount,
      message: data.message,
      sender_id: data.sender_id,
      recipient_id: recipientId
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

  return createdTransaction
}