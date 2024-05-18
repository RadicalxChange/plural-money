import GoogleSignInButton from "@/components/googleSignInButton";
import Link from "next/link";

export default async function SignIn() {

  return (
    <main className="flex flex-col items-center justify-center border-b-2 border-white">
      <div className="flex flex-col items-center justify-center w-full min-h-screen-minus-header bg-gradient-to-b">
        <h1 className="text-lg mb-6">Sign In</h1>
        <div className="space-y-4 mb-12">
          <GoogleSignInButton />
          <Link href="/zuath" className="block text-center px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-gray-400 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Sign In With Zupass</Link>
        </div>
      </div>
    </main>
  );
}
