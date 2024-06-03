"use client"

import { redirectHandler } from "@/lib/redirectHandler";
import { Claims } from "@auth0/nextjs-auth0";

export default function SignOutButton({
    user
  }: {
    user: Claims
  }) {
    
    // Function to handle form submission
    const handleIronLogout = async () => {

        fetch("/api/auth/zupass/logout", {
            method: "POST",
            headers: { "Content-Type": "application/json" }
        }).then(logoutResult => {
            if (logoutResult.ok) {
                redirectHandler('/')
            } else {
                // Handle response errors
                console.error("Logout failed with status:", logoutResult.status);
            }
          }).catch(error => {
            // Handle potential errors
            console.error("Error logging out:", error);
          });
    };

    if (user.sessionManager === "Auth0") {
        return (
            <button className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-gray-400 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <a href="/api/auth/logout">Sign Out</a>
            </button>
        );
    } else if (user.sessionManager === "Iron") {
        return (
            <button onClick={handleIronLogout} className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-gray-400 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Sign Out
            </button>
        )
    }
  }