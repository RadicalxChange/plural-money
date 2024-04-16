import { getUser } from "@/lib/user";
import { Account } from "@/types/account";
import { Transaction } from "@/types/transaction";

export default function Send() {

  const user: Account = getUser()

  return (
    <main className="flex min-h-screen flex-col items-center border-b-2 border-white">
      <div className="w-full px-24 pb-24 pt-12">
        <h1 className="text-left text-lg mb-12">Send</h1>
        <ul className="z-10 w-full max-w-5xl font-mono text-sm border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit rounded-xl border bg-gray-200 lg:p-4">
        </ul>
      </div>
    </main>
  );
}
