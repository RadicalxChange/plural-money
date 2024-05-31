import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { UserProvider } from '@auth0/nextjs-auth0/client';
import "./globals.css";
import Header from "@/components/header";
import MobileNav from "@/components/mobileNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Edge Esmeralda L∈dger",
  description: "A ledger for ∈dge holders",
  metadataBase: new URL(process.env.AUTH0_BASE_URL || "http://localhost:3000"),
  icons: {
    icon: '/icon.svg',
  },
  openGraph: {
    images: '/opengraph-image.png',
  },
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
          <MobileNav />
          {children}
        </body>
      </UserProvider>
    </html>
  );
}
