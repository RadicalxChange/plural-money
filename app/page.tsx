'use client'

import SignInButton from "@/components/signInButton";
import { Claims } from "@auth0/nextjs-auth0";
import { useUser } from "@auth0/nextjs-auth0/client";

export default async function HomePage() {

  const session: Claims | null = await useUser();
  const user = !session || !session.user ? null : session.user
  console.log(user)

  // Function to scroll to the "Learn More" section
  const scrollToLearnMore = () => {
    const section = document.getElementById('learn-more-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="flex flex-col items-center justify-center border-b-2 border-white">
      <div className="flex flex-col items-center justify-center w-full min-h-screen-minus-header bg-gradient-to-b">
        <h1 className="text-lg mb-6">Welcome to the Whoville Whocoin Site</h1>
        <div className="space-x-4 mb-12">
          {!user ? (
            <SignInButton />
          ) : null}
          <button onClick={scrollToLearnMore} className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-gray-400 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Learn More
          </button>
        </div>
      </div>
      <div id="learn-more-section" className="w-full min-h-screen-minus-header max-w-5xl px-24 py-12 font-mono text-sm bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit rounded-xl border bg-gray-200 lg:p-4">
        <h2 className="text-lg mt-12 mb-4">Learn More About Whoville Whocoins</h2>
        <p>This section provides more information about the Whoville Whocoins, how they work, benefits, etc. Here you can add all the necessary details about your platform and how it benefits its users.</p>
      </div>
    </main>
  );
}