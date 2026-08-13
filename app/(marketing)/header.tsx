import Image from "next/image";
import Link from "next/link";
import { Loader } from "lucide-react";
import { 
  ClerkLoaded, 
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export const Header = () => {
  const clerkConfigured =
    Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) &&
    Boolean(process.env.CLERK_SECRET_KEY);

  return (
    <header className="h-20 w-full border-b-2 border-[#202f36] bg-[#131f24] px-4">
      <div className="lg:max-w-screen-lg mx-auto flex items-center justify-between h-full">
        <div className="pt-4 pl-4 pb-4 flex items-center gap-x-3">
          <h1 className="text-3xl font-black text-[#58cc02] tracking-tighter lowercase">
            duolingo
          </h1>
        </div>
        {clerkConfigured ? (
          <>
            <ClerkLoading>
              <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
            </ClerkLoading>
            <ClerkLoaded>
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
              <SignedOut>
                <SignInButton
                  mode="modal"
                  afterSignInUrl="/learn"
                  afterSignUpUrl="/learn"
                >
                  <Button size="lg" variant="ghost">
                    Login
                  </Button>
                </SignInButton>
              </SignedOut>
            </ClerkLoaded>
          </>
        ) : (
          <Button size="lg" variant="ghost" asChild>
            <Link href="/learn">Continue</Link>
          </Button>
        )}
      </div>
    </header>
  );
};
