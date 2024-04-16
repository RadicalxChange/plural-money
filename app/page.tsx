import Image from "next/image";

export default function Home() {
  // Define an interface to describe the Whocoin balance structure
  interface Account {
    id: number;
    member: boolean; 
    name: string;
    balance: number;
  }

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

  const user: Account = { id: 3, member: true, name: "Twinkleton Fuzzyfoot", balance: 150 }

  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="z-10 w-full max-w-5xl font-mono fixed flex justify-between px-24 pt-12 pb-0 bg-black bg-opacity-100">
        <h1 className="text-left text-lg mb-12">Whoville Whocoin Ledger</h1>
        <div className="text-right">
            <p className="text-lg font-semibold">{user.name}</p>
            <p className="text-md">Balance: {user.balance} Whocoins</p>
        </div>
      </div>
      <div className="w-full p-24">
        <ul className="z-10 w-full max-w-5xl font-mono text-sm border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 mt-16 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit rounded-xl border bg-gray-200 lg:p-4">
          {accounts.map((account, index) => {
            return (
              <li key={index} className={`px-4 py-2 my-2 flex justify-between items-center ${account.id === user.id ? 'text-blue-400' : ''}`}>
                  {account.name} <span className="font-bold">{account.balance} Whocoins</span>
              </li>
            )
          })}
        </ul>
      </div>
    </main>
  );
}
