import AccountForm from "./accountForm";

export default async function Send() {

  return (
    <main className="flex min-h-screen flex-col items-center border-b-2 border-white">
      <div className="w-full px-24 pb-24 pt-12">
        <h1 className="text-left text-lg mb-12">Create a new Account</h1>
        <AccountForm />
      </div>
    </main>
  );
}
