import prisma from "@/db"
import { Account } from "@/types/account"

export async function GET(request: Request) {
  try {
    // Extract the query parameters from the request URL
    const url = new URL(request.url);
    const email = url.searchParams.get("email");
    const secret = url.searchParams.get("secret");

    // Validate that both `email` and `secret` fields are provided
    if (!email || !secret) {
      return new Response(
        JSON.stringify({ error: "Missing 'email' or 'secret' field." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Validate the secret
    if (secret !== process.env.AUTH0_HOOK_SECRET) {
      return new Response(
        JSON.stringify({ error: "Unauthorized: Invalid secret." }),
        { status: 403, headers: { "Content-Type": "application/json" } }
      );
    }

    // Find the account associated with the provided email
    const account: Account | null = await prisma.account.findUnique({
      where: { email },
    });

    // Return the account information if found, or a message if not found
    if (account) {
      return new Response(
        JSON.stringify({ account }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } else {
      return new Response(
        JSON.stringify({ message: `No account associated with email: ${email}` }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
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
}