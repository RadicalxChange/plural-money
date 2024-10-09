import { Transaction } from "./transaction";

export interface Account {
    id: number;
    name: string;
    email: string;
    balance: number;
    velocity: number;
    is_member: boolean;
    is_admin: boolean;
    is_bank: boolean;
    pending_approval: boolean;
    transactions_sent?: Transaction[];
    transactions_received?: Transaction[];
}

export interface AccountFormState {
    name: string;
    email: string;
    balance: string;
    isMember: boolean;
    isAdmin: boolean;
}

export interface OnboardFormState {
    name: string;
    email: string;
    agreedRules: boolean;
    paidFee: boolean;
  }

// Type Guard for json that might be Account data
export function isValidAccount(obj: any): obj is Account {

    // Required fields with their expected types. Must be hardcoded here because Typescript types don't exist at runtime.
    const requiredFields: [keyof Account, string][] = [
        ['id', 'number'],
        ['name', 'string'],
        ['email', 'string'],
        ['balance', 'number'],
        ['is_member', 'boolean'],
        ['is_admin', 'boolean']
    ];

    return obj && requiredFields.every(([field, type]) => field in obj && typeof obj[field] === type)
}