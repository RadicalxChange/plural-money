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

  if (data.is_taxable) {
    // Deposit any tax into the bank
    const bank: Account | null = await prisma.account.findFirst({
      where: {
        is_bank: true,
      }
    });
    if (bank) {
      const updatedBank: Account = await prisma.account.update({
        where: { id: bank.id },
        data: {
          balance: {
            increment: +data.amount
          }
        },
      });
    }
  }

  // Subtract amount, plus any tax, from the sender balance
  const updatedSender: Account = await prisma.account.update({
    where: { id: data.sender_id },
    data: {
      balance: {
        decrement: +data.amount * (data.is_taxable ? 2 : 1)
      }
    },
  });

  // Record the transaction
  const createdTransaction: Transaction = await prisma.transaction.create({
    data: {
      amount: +data.amount,
      message: data.message,
      sender_id: data.sender_id,
      recipient_id: recipientId,
      is_taxable: data.is_taxable
    }
  })

  return createdTransaction
}