import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // const token = request.cookies.has("token");
  // if (!token)
  //   return NextResponse.redirect(new URL("/admin/login", request.url));
}

// export const config = {
//   matcher: ["/", "/dashboard/:path*", "/admin/new"],
// };
