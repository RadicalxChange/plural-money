import { Transaction } from "@/types/transaction";

// export async function getTransactions(): Promise<Transaction[]> {
//   const res = await fetch('/api/transactions')
//   const transactions: Transaction[] = await res.json()
//   return transactions
// }

export function getTransactions(): Transaction[] {
  // Example data array
  const transactions: Transaction[] = [
    {
      "id": 1,
      "sender": {
        "id": 1,
        "member": true,
        "name": "Fizzlepop Whiskerwig",
        "balance": 120
      },
      "recipient": {
        "id": 13,
        "member": true,
        "name": "Whirlygig Sprinklehuff",
        "balance": 88
      },
      "amount": 5,
      "message": "a batch of starlight muffins"
    },
    {
      "id": 2,
      "sender": {
        "id": 10,
        "member": true,
        "name": "Zany Zigglewink",
        "balance": 154
      },
      "recipient": {
        "id": 7,
        "member": true,
        "name": "Squiggly Doodlepuff",
        "balance": 43
      },
      "amount": 35,
      "message": "a rainbow-colored umbrella"
    },
    {
      "id": 3,
      "sender": {
        "id": 11,
        "member": true,
        "name": "Tiddlywinks McPhee",
        "balance": 68
      },
      "recipient": {
        "id": 3,
        "member": true,
        "name": "Twinkleton Fuzzyfoot",
        "balance": 150
      },
      "amount": 22,
      "message": "a rainbow-colored umbrella"
    },
    {
      "id": 4,
      "sender": {
        "id": 4,
        "member": true,
        "name": "Mimsy Popplesnoot",
        "balance": 130
      },
      "recipient": {
        "id": 12,
        "member": true,
        "name": "Gigglesnort Quibblefoot",
        "balance": 131
      },
      "amount": 15,
      "message": "a magical snow globe"
    },
    {
      "id": 5,
      "sender": {
        "id": 20,
        "member": true,
        "name": "Fuddlewhack Pinglepong",
        "balance": 92
      },
      "recipient": {
        "id": 6,
        "member": true,
        "name": "Jellibean Tickletoe",
        "balance": 185
      },
      "amount": 16,
      "message": "a set of magical marbles"
    },
    {
      "id": 6,
      "sender": {
        "id": 3,
        "member": true,
        "name": "Twinkleton Fuzzyfoot",
        "balance": 150
      },
      "recipient": {
        "id": 6,
        "member": true,
        "name": "Jellibean Tickletoe",
        "balance": 185
      },
      "amount": 9,
      "message": "a moonbeam blanket"
    },
    {
      "id": 7,
      "sender": {
        "id": 7,
        "member": true,
        "name": "Squiggly Doodlepuff",
        "balance": 43
      },
      "recipient": {
        "id": 20,
        "member": true,
        "name": "Fuddlewhack Pinglepong",
        "balance": 92
      },
      "amount": 19,
      "message": "a singing teapot"
    },
    {
      "id": 8,
      "sender": {
        "id": 19,
        "member": true,
        "name": "Lollygag Whimbrel",
        "balance": 123
      },
      "recipient": {
        "id": 5,
        "member": true,
        "name": "Goober Noodleman",
        "balance": 110
      },
      "amount": 61,
      "message": "a rainbow-colored umbrella"
    },
    {
      "id": 9,
      "sender": {
        "id": 8,
        "member": true,
        "name": "Merrywhirl Grumbleton",
        "balance": 112
      },
      "recipient": {
        "id": 18,
        "member": true,
        "name": "Whimseydust Tralala",
        "balance": 142
      },
      "amount": 33,
      "message": "an enchanted storybook"
    },
    {
      "id": 10,
      "sender": {
        "id": 14,
        "member": true,
        "name": "Bonnyblink Jubilee",
        "balance": 201
      },
      "recipient": {
        "id": 8,
        "member": true,
        "name": "Merrywhirl Grumbleton",
        "balance": 112
      },
      "amount": 34,
      "message": "a moonbeam blanket"
    }
  ];
  return transactions
}