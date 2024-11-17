import { JWT } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Redirect to /signin if the user is not authenticated
    if (!req.nextauth.token) return NextResponse.redirect("/signin");
    // Redirect to /welcome if the user is authenticated but doesn't have a name
    if (!(req.nextauth.token as JWT).name)
      return NextResponse.rewrite(new URL("/welcome", req.url));
    // Continue if the user is authenticated and has a name
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  },
);

export const config = {
  matcher: ["/snipboard/:path*"],
};
