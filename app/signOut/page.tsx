export default async function SignOut() {

  return (
    <main className="flex min-h-screen flex-col items-center border-b-2 border-white">
      <div className="w-full px-24 pb-24 pt-12">
        <a href="/api/auth/logout">Sign Out</a>
      </div>
    </main>
  );
}
