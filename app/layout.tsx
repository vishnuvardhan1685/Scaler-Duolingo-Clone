import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import { ExitModal } from "@/components/modals/exit-modal";
import { HeartsModal } from "@/components/modals/hearts-modal";
import { PracticeModal } from "@/components/modals/practice-modal";
import { GuidebookModal } from "@/components/modals/guidebook-modal";
import { InviteFriendsModal } from "@/components/modals/invite-friends-modal";
import { Analytics } from '@vercel/analytics/react';
import "./globals.css";

export const metadata: Metadata = {
  title: "Duolingo Clone",
  description: "Learn, practice, and master new languages with Lingo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const clerkConfigured =
    Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) &&
    Boolean(process.env.CLERK_SECRET_KEY);

  const Provider = clerkConfigured
    ? require("@clerk/nextjs").ClerkProvider
    : ({ children }: { children: React.ReactNode }) => <>{children}</>;

  return (
    <Provider>
      <html lang="en">
        <body className="font-sans">
          <Toaster />
          <ExitModal />
          <HeartsModal />
          <PracticeModal />
          <GuidebookModal />
          <InviteFriendsModal />
          {children}
          <Analytics />
        </body>
      </html>
    </Provider>
  );
}
