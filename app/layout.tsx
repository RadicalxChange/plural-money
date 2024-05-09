import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { UserProvider } from '@auth0/nextjs-auth0/client';
import "./globals.css";
import Header from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Whoville Whocoin Ledger",
  description: "A ledger for Whocoin holders",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserProvider>
        <body className={inter.className}>
          <Header />
          {children}
        </body>
      </UserProvider>
    </html>
  );
}
