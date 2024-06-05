"use server"

import { Account } from "@/types/account";
import sendgrid from "@sendgrid/mail";

process.env.SENDGRID_API_KEY && sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

export function sendMail(recipient: Account, data: any): void {
  // send email to recipient using Twilio SendGrid's v3 Node.js Library
  // https://github.com/sendgrid/sendgrid-nodejs
  const msg: any = {
    to: recipient.email,
    from: process.env.EMAIL_SENDER,
    templateId: recipient.is_member ? process.env.MEMBER_TEMPLATE_KEY : process.env.NONMEMBER_TEMPLATE_KEY,
    subject: data.sender_name + " sent you " + data.amount + " ∈dges",
    dynamic_template_data: { 
      sender_name: data.sender_name,
      amount: data.amount,
      message: data.message
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
}