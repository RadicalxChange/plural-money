import { Account } from "./account";

export interface Transaction {
    id: number;
    amount: number;
    message: string;
    sender_id: number;
    recipient_id: number;
    is_taxable: boolean;
}

export interface TransactionFormState {
    name: string;
    email: string;
    amount: string;
    message: string;
    isTaxable: boolean;
}

export interface StagedTransaction {
    amount: number;
    message: string;
    sender_id: number;
    sender_name: string;
    recipient_account: Account | null;
    recipient_email: string;
    recipient_name: string;
    is_taxable: boolean;
}