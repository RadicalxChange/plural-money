"use client";

import { config } from "@/config/zuauth";
import { redirectHome } from "@/lib/redirectHome";
import { zuAuthPopup } from "@pcd/zuauth/client";
import { useCallback, useEffect, useState } from "react";

type AuthState =
  | "logged out"
  | "auth-start"
  | "authenticating"
  | "authenticated"
  | "error";

export default function SignIn() {
  const [authState, setAuthState] = useState<AuthState>("logged out");

  useEffect(() => {
    (async () => {
      if (authState === "auth-start") {
        console.log("Fetching watermark");
        const watermark = (await (await fetch("/api/auth/zupass/watermark")).json())
          .watermark;
        console.log("Got watermark");
        console.log("Opening popup window");
        setAuthState("authenticating");
        const result = await zuAuthPopup({
          zupassUrl: process.env.NEXT_PUBLIC_ZUPASS_SERVER_URL as string,
          fieldsToReveal: {
            revealAttendeeEmail: true,
            revealAttendeeName: true,
            revealProductId: false
          },
          watermark,
          config: config
        });

        if (result.type === "pcd") {
          console.log("Received PCD");

          const loginResult = await fetch("/api/auth/zupass/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ pcd: result.pcdStr })
          });

          console.log("Authenticated successfully");
          setAuthState("authenticated");
          redirectHome();
        } else if (result.type === "popupBlocked") {
          console.log("The popup was blocked by your browser");
          setAuthState("error");
        } else if (result.type === "popupClosed") {
          console.log("The popup was closed before a result was received");
          setAuthState("error");
        } else {
          console.log(`Unexpected result type from zuAuth: ${result.type}`);
          setAuthState("error");
        }
      }
    })();
  }, [authState]);

  const auth = useCallback(() => {
    if (authState === "logged out" || authState === "error") {
      console.log("Beginning authentication");
      setAuthState("auth-start");
    }
  }, [console.log, authState]);

  return (
    <main className="flex flex-col items-center justify-center border-b-2 border-white">
      <div className="flex flex-col items-center justify-center w-full min-h-screen-minus-header bg-gradient-to-b">
        <h1 className="text-lg mb-6">Sign In</h1>
        <div className="space-y-4 mb-12">
          <button 
            className="w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-gray-400 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={
              authState === "auth-start" || authState === "authenticating"
            }
          >
            <a href="/api/auth/login">Sign In With Google</a>
          </button>
          <button
            onClick={auth}
            className="block text-center px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-gray-400 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={
              authState === "auth-start" || authState === "authenticating"
            }
          >
            Sign In With Zupass
          </button>
        </div>
      </div>
    </main>
  );
}
