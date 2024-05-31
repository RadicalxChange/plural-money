import Home from "@/components/home";
import { getUser } from "@/lib/getUser";
import { Claims } from "@auth0/nextjs-auth0";

export default async function HomePage() {
  const user: Claims | null = await getUser()

  return (
    <Home user={user}/>
  );
}