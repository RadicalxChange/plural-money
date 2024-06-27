'use client'
// interactivity:
// - LearnMore button scrolls to about section onClick

import { Claims } from "@auth0/nextjs-auth0";
import Link from "next/link";
import About from "@/content/about.mdx"

export default function Home({
    user
  }: {
    user: Claims | null
  }) {

  // Function to scroll to the "Learn More" section
  const scrollToLearnMore = () => {
    const section = document.getElementById('learn-more-section');
    if (section) {
      section.style.scrollMarginTop = "78px"
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center w-full min-h-screen-minus-header bg-gradient-to-b">
        <h1 className="text-lg m-6 text-center">Welcome to the Edge Esmeralda L∈dger</h1>
        <div className="space-x-4 mb-4">
          {!user ? (
            <button className="px-7 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-gray-400 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <Link href="/signIn">Sign In</Link>
            </button>
          ) : null}
          <button onClick={scrollToLearnMore} className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-gray-400 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Learn More
          </button>
        </div>
        {!user?.account_is_member ? (
          <button className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-gray-400 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <Link href="/onboard">Onboard</Link>
          </button>
        ) : null}
      </div>
      <div id="learn-more-section" className="w-full max-w-5xl min-h-screen-minus-header mb-12 p-4 font-mono text-sm bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit rounded-xl border bg-gray-200">
        <About />
      </div>
    </main>
  );
}