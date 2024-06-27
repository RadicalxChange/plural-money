import SignInButtons from "@/components/signInButtons";

interface SignInProps {
  searchParams: {
    redirectUri?: string
  }
}

export default function SignIn({ searchParams }: SignInProps) {

  return (
    <main className="flex flex-col items-center justify-center w-full min-h-screen-minus-header bg-gradient-to-b">
      <h1 className="text-lg mb-6">Sign In</h1>
      <SignInButtons redirectUri={searchParams.redirectUri ?? '/'} />
    </main>
  );
}
