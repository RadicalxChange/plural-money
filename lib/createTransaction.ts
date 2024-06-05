'use server'

import prisma from "@/db"
import { Account } from "@/types/account";
import { StagedTransaction, Transaction } from "@/types/transaction"
import { createAccount } from "./createAccount";
import sendgrid from "@sendgrid/mail";

process.env.SENDGRID_API_KEY && sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

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
        }
      },
    });
    recipient = data.recipient_account
  } else {
    // if recipient account does not exist, create new non-member account
    const createdAccount: Account = await createAccount(
      {
        name: data.recipient_name,
        email: data.recipient_email,
        balance: data.amount.toString(),
        isMember: false,
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

  // send email to recipient using Twilio SendGrid's v3 Node.js Library
  // https://github.com/sendgrid/sendgrid-nodejs
  const msg: any = {
    to: recipient.email,
    from: process.env.EMAIL_SENDER,
    templateId: process.env.MAIL_TEMPLATE_KEY,
    subject: data.sender_name + " sent you " + data.amount + " ∈dges",
    dynamic_template_data: { 
      sender_name: data.sender_name,
      amount: data.amount,
      message: data.message,
      is_member: recipient.is_member
     },
  }
  console.log(msg)
  sendgrid
    .send(msg)
    .then(() => {
      console.log('Email sent')
    })
    .catch((error) => {
      console.error(error)
    })

  return createdTransaction
}