import { Account } from "@/types/account"

// export async function getUser(): Promise<Account> {
//   const res = await fetch('/api/session')
//   const user: Account = await res.json()
//   return user
// }

export function getUser(): Account {
  // Example user
  const user: Account = { id: 3, member: true, name: "Twinkleton Fuzzyfoot", balance: 150 }
  return user
}