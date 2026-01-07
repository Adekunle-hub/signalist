import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

import { getAuth } from "@/lib/better-auth/auth";

export async function proxy(request: NextRequest) {
  const auth = await getAuth();
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sign-in|sign-up|assets)>*)",
  ],
};
