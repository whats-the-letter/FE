import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const albumId = url.pathname.split("/")[2];

  if (url.pathname === "/") return NextResponse.next();

  if (url.pathname === "/info" || url.pathname === `/newalbum/${albumId}`) {
   
  }
  return NextResponse.next();
}
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/data|_next/image|favicon.ico|onboard).*)",
  ],
};
