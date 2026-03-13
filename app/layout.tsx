import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import AppShell from "@/components/AppShell";
import "./globals.css";

export const metadata: Metadata = {
  title: "CHB Poultry Management",
  description: "Chicken farm management system",
  viewport: "width=device-width, initial-scale=1",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 antialiased">
        <SessionProvider session={session}>
          <AppShell
            isLoggedIn={!!session}
            userEmail={session?.user?.email}
          >
            {children}
          </AppShell>
        </SessionProvider>
      </body>
    </html>
  );
}
