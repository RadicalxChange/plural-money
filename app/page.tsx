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
  ];

  const user: Account = { id: 3, member: true, name: "Twinkleton Fuzzyfoot", balance: 150 }

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="z-10 w-full max-w-5xl font-mono">
        <h1 className="text-lg mb-12">Whoville Whocoin Ledger</h1>
      </div>
      <ul className="z-10 w-full max-w-5xl font-mono text-sm border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
        {accounts.map((account, index) => {
          return (
            <li key={index} className={`px-4 py-2 my-2 flex justify-between items-center ${account.id === user.id ? 'text-blue-400' : ''}`}>
                {account.name} <span className="font-bold">{account.balance} Whocoins</span>
            </li>
          )
        })}
      </ul>
    </main>
  );
}
