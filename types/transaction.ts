import { Account } from "./account";

export interface Transaction {
    id: number;
    amount: number;
    message: string;
    sender_id: number;
    recipient_id: number;
}

export interface TransactionFormState {
    name: string;
    amount: string;
    message: string;
}

export interface StagedTransaction {
    amount: number;
    message: string;
    sender_id: number;
    recipient_id: number;
}