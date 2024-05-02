// import { NextRequest, NextResponse } from 'next/server'


// export async function middleware(req: NextRequest) {
//   const url = req.nextUrl.clone()
//   if (url.pathname === '/') return NextResponse.next()
  
//   if (url.pathname === '/signup') {
    
      
    
//     if (!provider || !token) {
//       return NextResponse.redirect(new URL('/', req.url))
//     }
//   }
//   return NextResponse.next()
// }
// export const config = {
//   matcher: [
//     '/((?!api|_next/static|_next/data|_next/image|favicon.ico|onboard).*)',
//   ],
// }