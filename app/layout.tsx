import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Roboto } from "next/font/google";
const roboto = Roboto({ weight: "400", subsets: ["latin"] });
import "./styles/globals.css";

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import Header from "../components/Header";



export const metadata: Metadata = {
  title: "Money Tracker",
  description: "Tracking for Expenses n' Such",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={roboto.className}>
          <Header />
          <main className="container">
            {children}
          </main>
          <ToastContainer closeOnClick theme="colored" position="top-center" />
        </body>
      </html>
    </ClerkProvider>
  );
}

/* Clerk Official Docs version:
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en"> <body>
          <SignedOut> <SignInButton /> </SignedOut>
          <SignedIn> <UserButton /> </SignedIn>
          {children}
      </body> </html>
    </ClerkProvider>
  )
}
*/