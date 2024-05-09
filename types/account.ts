import { Transaction } from "./transaction";

export interface Account {
    id: number;
    name: string;
    email: string;
    balance: number;
    is_member: boolean;
    is_admin: boolean;
    transactions_sent?: Transaction[];
    transactions_received?: Transaction[];
}

export interface AccountFormState {
    name: string;
    email: string;
    balance: string;
    isMember: boolean;
}