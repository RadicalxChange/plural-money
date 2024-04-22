import { Account } from "./account";

export interface Transaction {
    id: number;
    sender: Account;
    recipient: Account;
    amount: number;
    message: string;
}

export interface TransactionFormState {
    name: string;
    amount: string;
    message: string;
}