import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

const clerkConfigured =
  Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) &&
  Boolean(process.env.CLERK_SECRET_KEY);

export default async function middleware(request: NextRequest, event: NextFetchEvent) {
  if (!clerkConfigured) {
    return NextResponse.next();
  }

  const { authMiddleware } = await import("@clerk/nextjs");

  return authMiddleware({
    publicRoutes: ["/", "/api/webhooks/stripe"],
  })(request, event);
}
 
export const config = {
  // Protects all routes, including api/trpc.
  // See https://clerk.com/docs/references/nextjs/auth-middleware
  // for more information about configuring your Middleware
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
