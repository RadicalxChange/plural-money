import 'server-only'

import { Account } from "@/types/account"

export function getUser(): Account {

  // Example user
  const user: Account = { id: 4, name: "Twinkleton Fuzzyfoot", balance: 120, is_member: true, is_admin: true }

  return user
}