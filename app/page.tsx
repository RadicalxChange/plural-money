'use client'

import { getUser } from "@/lib/getUser";
import { Claims } from "@auth0/nextjs-auth0";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [user, setUser] = useState<Claims | null>(null);

  useEffect(() => {
    (async () => {
      setUser(await getUser())
    })();
  }, []);

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
        <h1 className="text-lg m-6 text-center">Welcome to the Edge Esmeralda L∈dger</h1>
        <div className="space-x-4 mb-12">
          {!user ? (
            <button className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-gray-400 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <Link href="/signIn">Sign In</Link>
            </button>
          ) : null}
          <button onClick={scrollToLearnMore} className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-gray-400 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Learn More
          </button>
        </div>
      </div>
      <div id="learn-more-section" className="w-full max-w-5xl min-h-screen-minus-header p-4 font-mono text-sm bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit rounded-xl border bg-gray-200">
        <h2 className="text-lg mt-12 mb-4">About ∈dges</h2>
        <p>This section provides more information about ∈dges.</p>
      </div>
    </main>
  );
}