import CreateAccountForm from "./createAccountForm";

export default async function CreateAccounts() {

  return (
    <main className="flex min-h-screen flex-col items-center border-b-2 border-white">
      <div className="w-full px-4 pb-4 lg:px-24 pt-12">
        <h1 className="text-left text-lg mb-12">Create a new Account</h1>
        <CreateAccountForm />
      </div>
    </main>
  );
}