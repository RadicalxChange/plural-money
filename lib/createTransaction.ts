'use server'

import prisma from "@/db"
import { Account } from "@/types/account";
import { StagedTransaction, Transaction } from "@/types/transaction"
import { sendMail } from "./sendMail";

// TODO: handle errors
export async function createTransaction(data: StagedTransaction): Promise<Transaction> {

  let recipient: Account;

  if (data.recipient_account) {
    // If recipient account exists, update recipient balance
    const updatedRecipient: Account = await prisma.account.update({
      where: { id: data.recipient_account.id },
      data: {
        balance: {
          increment: data.amount
        },
        velocity: {
          increment: data.amount
        }
      },
    });
    recipient = data.recipient_account
  } else {
    // if recipient account does not exist, create new non-member account
    const createdAccount: Account = await prisma.account.create({
      data: {
        name: data.recipient_name,
        email: data.recipient_email,
        balance: data.amount,
        velocity: data.amount,
        is_member: false,
      }
    })
    recipient = createdAccount
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
            increment: data.amount
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
        decrement: data.amount * (data.is_taxable ? 2 : 1)
      },
      velocity: {
        increment: data.amount
      }
    },
  });

  // Record the transaction
  const createdTransaction: Transaction = await prisma.transaction.create({
    data: {
      amount: data.amount,
      message: data.message,
      sender_id: data.sender_id,
      recipient_id: recipient.id,
      is_taxable: data.is_taxable
    }
  })

  // send email to recipient
  sendMail(recipient, data)

  return createdTransaction
}