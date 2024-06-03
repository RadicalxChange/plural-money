'use client'
// interactivity:
// - LearnMore button scrolls to about section onClick

import { Claims } from "@auth0/nextjs-auth0";
import Link from "next/link";
import Image from 'next/image'

export default function Home({
    user
  }: {
    user: Claims | null
  }) {

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
      <div id="learn-more-section" className="w-full max-w-5xl min-h-screen-minus-header mb-12 p-4 font-mono text-sm bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit rounded-xl border bg-gray-200">
        <h2 className="text-lg mt-12 mb-12">About ∈dges</h2>
        <p className="my-4">To get onboarded, come to an ∈dges meeting!</p>
        <Image className="mx-auto" src="/circles.png" alt="community membranes" width="300" height="300" />
        <p className="font-bold my-4">Why</p>
        <p className="my-4">Picture a non-hierarchical group of people hanging out and collaborating. Now picture that group of people paying each other for time and work. In one sense, this will make them better able to collaborate on substantial projects, but in another sense, it will erode their identity as a “community”.</p>
        <p className="my-4">This, we believe, is because conventional money (fiat, crypto, gold, ETFs, etc) is a “global” rather than “local” measure of value. Precisely because money’s value is easily recognized outside the community, holding money encourages people to think less about the community’s wants and needs. Accumulating money reduces not only individuals’ dependence on community, but also their commitment to it.</p>
        <p>This is a problem for intentional communities that want to take on ambitious projects. They are between a rock and a hard place: If they don’t use money internally, they have trouble scaling collaboration, but if they do use it, they lose their identity as communities.</p>
        <p className="font-bold my-4">We are interested in developing community currency systems that find the optima in this dilemma.</p>
        <Image className="mx-auto" src="/circles.png" alt="community membranes" width="300" height="300" />
        <p className="font-bold my-4">What</p>
        <p className="my-4">Complementary currencies that are intentionally more valuable <i>inside</i> a community than <i>outside</i> it mitigate money’s community-eroding, “centrifugal” quality. That’s what we’re hoping to build.</p>
        <p className="my-4">∈dges is a social experiment in creating a non-crypto, trust-based complementary currency system. If it works, it could help the Edge Esmeralda community collaborate and scale without losing coherence and commitment. ∈dges also might be worth something, although that value will be differentially realizable <i>within</i> the Edge Esmeralda community. We’ve built a simple app and laid out a series of incentives that we hope will create a flywheel of collaboration.</p>
        <p className="my-4">This only works with a game community – so we hope you’ll join us!</p>
        <Image className="mx-auto" src="/circles.png" alt="community membranes" width="300" height="300" />
        <p className="font-bold my-4">How</p>
        <p className="my-4">A critical ingredient in ∈dges is trust. Accordingly, the “central bank” is a simple trust pool. If you’d like to become a “member” of the system, you’ll need to (a) have an Edge Esmeralda Zupass ticket, and (b) deposit a token amount of real money in a pool that any other member can unilaterally withdraw from. (Come to one of our events at Edge Esmeralda to get set up.) So from the very beginning, we’re relying on our social ties and counting on each other to act in good faith.</p>
        <p className="my-4">Second, if you want to send ∈dges to non-members, you can – but you have to pay an “exit tax”. This forms a kind of membrane around the currency system, encouraging us to think about how to serve local rather than global needs.</p>
        <p className="my-4">Third, ∈dges should be used mainly to compensate and/or recognize contributions of time and effort – not exchanges for durable assets. Durable assets are a kind of “global money” since they can be easily resold outside the community; buying them is therefore a kind of “exit”. The purpose of each transaction is recorded in an honor-system ledger that only members can see.</p>
        <p className="my-4">Thus, to accept ∈dges, or to offer services in exchange for ∈dges, means something. It signals trust in the potential of the community and desire for integration into it. To be rich in ∈dges means that you’ve done things for others around here; it’s a more meaningful signal than wealth in global money, which easily crosses and punctures social contexts.</p>
        <p className="my-4"><strong>To get onboarded, come to one of our meetings!</strong> For more details, see the <a className="underline hover:outline-none" href="/rules">Rules</a> page.</p>
      </div>
    </main>
  );
}