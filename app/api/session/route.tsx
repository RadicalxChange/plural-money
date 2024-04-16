import { auth } from "@/auth"
import { Account } from "@/types/account"

export async function GET(request: Request) {
//   access Github session
//   const session = await auth()
//   if (!session) return null

// hardcoded test user
    const user: Account = { id: 3, member: true, name: "Twinkleton Fuzzyfoot", balance: 150 }
    return user

}