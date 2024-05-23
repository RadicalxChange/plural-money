import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { UserProvider } from '@auth0/nextjs-auth0/client';
import "./globals.css";
import Header from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Edge Esmeralda L∈dger",
  description: "A ledger for ∈dge holders",
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
          <link rel="icon" href="/curly-braces.svg" sizes="any" />
          <Header />
          {children}
        </body>
      </UserProvider>
    </html>
  );
}
