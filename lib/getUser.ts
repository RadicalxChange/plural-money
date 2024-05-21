import { ironOptions, SessionData } from "@/config/iron";
import { Account } from "@/types/account";
import { Claims, getSession, Session } from "@auth0/nextjs-auth0";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { getAccount } from "./getAccount";

export async function getUser(): Promise<Claims | null> {
    
    // check for Auth0 user session. Return the user if exists.
    const auth0Session: Session | null | undefined = await getSession();

    if (auth0Session && auth0Session.user) {
      return { ...auth0Session.user, sessionManager: "Auth0" }
    }

    // check for Iron user session. Return the user if exists.
    const ironSession = await getIronSession<SessionData>(
      cookies() as any,
      ironOptions
    );

    if (ironSession && ironSession.user) {
      const zupassUser: Claims = {
        sessionManager: "Iron",
        name: ironSession.user.attendeeName,
        email: ironSession.user.attendeeEmail
      }
      const account: Account | null = await getAccount(zupassUser.email)
      if (account) {
        zupassUser.account_id = account.id
        zupassUser.account_is_member = account.is_member
        zupassUser.account_is_admin = account.is_admin
      }
      return zupassUser
    }

    // if no user session exists, return null
    return null
  }