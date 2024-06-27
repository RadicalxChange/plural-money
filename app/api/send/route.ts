import prisma from "@/db"
import { getUser } from "@/lib/getUser";
import { Account } from "@/types/account"
import { Claims } from "@auth0/nextjs-auth0";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  // Extract the query parameters from the request URL
  const searchParams = request.nextUrl.searchParams
  let redirectUri: string
  try {
    const senderEmail = searchParams.get("senderEmail");
    const recipientEmail = searchParams.get("recipientEmail");
    const recipientName = searchParams.get("recipientName");
    const secret = searchParams.get("secret");
    const user: Claims | null = await getUser()

    // Validate that the `email` fields are provided
    if (!senderEmail || !recipientEmail || !recipientName) {
      return new Response(
        JSON.stringify({ error: "Must provide a 'senderEmail' and a 'recipientEmail' field." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Validate Auth0 hook secret
    if (secret !== process.env.SOLA_HOOK_SECRET) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 403, headers: { "Content-Type": "application/json" } }
      );
    }

    // Find the account associated with the provided email
    const account: Account | null = await prisma.account.findUnique({
      where: { email: senderEmail },
    });

    // Redirect user to send page, signIn page, or onboarding page
    if (!account) {
        redirectUri = '/onboard'
    } else if (user && user.email === senderEmail) {
        redirectUri = `/send?recipientName=${recipientName}&recipientEmail=${recipientEmail}`
    } else {
        const encodedUri: string = encodeURIComponent(`/send?recipientName=${recipientName}&recipientEmail=${recipientEmail}`)
        redirectUri = `/signIn?redirectUri=${encodedUri}`
    }
  } catch (error) {
    // Handle specific errors or general errors
    if (error instanceof SyntaxError) {
      // Handles JSON parsing errors
      return new Response(
        JSON.stringify({ error: "Invalid JSON body." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Log the error for debugging and respond with a 500 error for unexpected issues
    console.error("Error processing request:", error);
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  redirect(redirectUri || '/')
}