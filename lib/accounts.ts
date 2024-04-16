import { Account } from "@/types/account"

// export async function getAccounts(): Promise<Account[]> {
//   const res = await fetch('/api/participants')
//   const accounts: Account[] = await res.json()
//   return accounts
// }

export function getAccounts(): Account[] {
  // Example data array
  const accounts: Account[] = [
    { id: 1, member: true, name: "Fizzlepop Whiskerwig", balance: 120 },
    { id: 2, member: true, name: "Bumbelina Squeaksworth", balance: 105 },
    { id: 3, member: true, name: "Twinkleton Fuzzyfoot", balance: 150 },
    { id: 4, member: true, name: "Mimsy Popplesnoot", balance: 130 },
    { id: 5, member: true, name: "Goober Noodleman", balance: 110 },
    { id: 6,  member: true, name: "Jellibean Tickletoe", balance: 185 },
    { id: 7,  member: true, name: "Squiggly Doodlepuff", balance: 43 },
    { id: 8,  member: true, name: "Merrywhirl Grumbleton", balance: 112 },
    { id: 9,  member: true, name: "Poppynoodle Fizzgig", balance: 97 },
    { id: 10, member: true, name: "Zany Zigglewink", balance: 154 },
    { id: 11, member: true, name: "Tiddlywinks McPhee", balance: 68 },
    { id: 12, member: true, name: "Gigglesnort Quibblefoot", balance: 131 },
    { id: 13, member: true, name: "Whirlygig Sprinklehuff", balance: 88 },
    { id: 14, member: true, name: "Bonnyblink Jubilee", balance: 201 },
    { id: 15, member: true, name: "Truffula Specklebee", balance: 59 },
    { id: 16, member: true, name: "Squeegee Picklenose", balance: 134 },
    { id: 17, member: true, name: "Chucklebuns Floofenwhirl", balance: 76 },
    { id: 18, member: true, name: "Whimseydust Tralala", balance: 142 },
    { id: 19, member: true, name: "Lollygag Whimbrel", balance: 123 },
    { id: 20, member: true, name: "Fuddlewhack Pinglepong", balance: 92 }
  ];
  return accounts
}