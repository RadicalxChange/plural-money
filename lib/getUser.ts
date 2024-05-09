import { Claims, getSession, Session } from "@auth0/nextjs-auth0";

export async function getUser(): Promise<Claims | null> {
    
    // get user session from Auth0
    const session: Session | null | undefined = await getSession();

    // return Auth0 user session if exists
    return !session || !session.user ? null : session.user
  }