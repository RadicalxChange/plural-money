'server-only'

import { Account } from "@/types/account"
import { StagedTransaction } from "@/types/transaction"
import sendgrid from "@sendgrid/mail";

process.env.SENDGRID_API_KEY && sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

// send email to recipient using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
export function sendMail(recipient: Account, transactionData?: StagedTransaction): void {

    const msg: any = {
      to: recipient.email,
      from: process.env.EMAIL_SENDER,
      templateId: typeof transactionData !== 'undefined' ? process.env.TRANSACTION_MAIL_TEMPLATE_KEY : process.env.ONBOARD_MAIL_TEMPLATE_KEY,
      subject: typeof transactionData !== 'undefined' ? transactionData.sender_name + " sent you " + transactionData.amount + " ∈dges" : "Your ∈dges onboarding is complete!",
      dynamic_template_data: typeof transactionData !== 'undefined' ? { 
        sender_name: transactionData.sender_name,
        amount: transactionData.amount,
        message: transactionData.message,
        is_member: recipient.is_member
       } : {},
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
  }