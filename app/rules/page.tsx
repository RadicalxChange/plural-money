import MembersOnly from "@/components/membersOnly";
import { getAccounts } from "@/lib/getAccounts";
import { getUser } from "@/lib/getUser";
import { Account } from "@/types/account";
import { Claims } from "@auth0/nextjs-auth0";

export default async function Participants() {
    
  const user: Claims | null = await getUser()
  const accounts: Account[] = await getAccounts()

  return (
    <main className="flex min-h-screen flex-col items-center border-b-2 border-white">
      <div className="w-full px-4 pb-4 lg:px-24 pt-12">
        <h1 className="text-left text-lg mb-12">Rules</h1>
        {user && user.account_is_member ? (
          <div className="w-full max-w-5xl font-mono lg:text-sm text-xs border-b border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit rounded-xl border bg-gray-200 lg:p-4">
            <p className="font-bold mt-8 mb-4">Details</p>
            <p className="py-1 my-1 flex justify-between items-center">Exit tax: 50%</p>
            <p className="py-1 my-1 flex justify-between items-center">Trust multiple: 5x</p>
            <p className="py-1 my-1 flex justify-between items-center">Min contribution: $20</p>
            <p className="py-1 my-1 flex justify-between items-center">Secretary: Matt</p>
            <p className="font-bold mt-8 mb-4">Joining the community</p>
            <ul className="list-disc ml-8">
              <li className="my-4">
                To join the community, you must (i) have an Edge Esmeralda Zupass ticket, (ii) come to an ∈dges meeting, and (iii) deposit $20 USD with the community “secretary”. You’ll then get onboarded as a community “member” and receive 100∈.
              </li>
            </ul>
            <p className="font-bold mt-8 mb-4">Sending ∈dges & “Exit Taxes”</p>
            <ul className="list-disc ml-8">
              <li className="my-4">
                Members may send ∈dges to members or nonmembers (i.e., anyone with an email address). Non-members who hold ∈dges may only send them to members.
              </li>
              <li className="my-4">
                Every time you send ∈dges, you must note the purpose of the ∈dges payment.
              </li>
              <li className="my-4">
                ∈dges payments are untaxed when they are:
                <ul className="list-disc ml-8">
                    <li className="my-4">To members; AND in exchange for:
                        <ul className="list-disc ml-8">
                            <li className="my-4">Personal services,</li>
                            <li className="my-4">Perishable goods,</li>
                            <li className="my-4">Work on listed ∈dges / Edge Esmeralda projects.</li>
                        </ul>
                    </li>
                </ul>
              </li>
              <li className="my-4">
                ∈dges payments are “exit taxed” when they are:
                <ul className="list-disc ml-8">
                    <li className="my-4">To non-members; OR in exchange for:
                        <ul className="list-disc ml-8">
                            <li className="my-4">Non-perishable goods,</li>
                            <li className="my-4">Work on unlisted private / personally-owned projects.</li>
                        </ul>
                    </li>
                </ul>
              </li>
              <li className="my-4">
                Exit taxes are 100% and are payable in ∈dges.
              </li>
            </ul>

            <p className="font-bold mt-8 mb-4">Definitions</p>
            <ul className="list-disc ml-8">
                <li className="my-4"><strong>Personal Services:</strong> Ethereal services that don’t add value to a durable asset.</li>
                <li className="my-4"><strong>Perishable Goods:</strong> Items intended for immediate consumption.</li>
                <li className="my-4"><strong>Listed Projects:</strong> Projects listed on the community repo, dedicated to the community good and not privately owned.</li>
            </ul>

            <p className="font-bold mt-8 mb-4">Rule &amp; Secretary Changes</p>
            <ul className="list-disc ml-8">
                <li className="my-4">Rules may evolve and change over time.</li>
                <li className="my-4">The ∈dges secretary runs meetings for voting on rule changes and may put their role up for election.</li>
            </ul>

          </div>
        ) : (
          <MembersOnly />
        )}
      </div>
    </main>
  );
}
