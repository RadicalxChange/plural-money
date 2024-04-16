import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Account } from "@/types/account";
import { getUser } from "@/lib/user";
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
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
