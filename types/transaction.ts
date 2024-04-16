import { Account } from "./account";

export interface Transaction {
    id: number;
    sender: Account;
    recipient: Account;
    amount: number;
    message: string;
}