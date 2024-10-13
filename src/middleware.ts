import { NextResponse, type NextRequest } from 'next/server';

import { createClient } from './utils/supabase/server';

export async function middleware(request: NextRequest) {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // 👇 .pathname is located here
  // const nextUrl = request.nextUrl;
  // console.log(request.url);
  // // Allow access to the homepage without session
  // if (nextUrl.pathname === '/') {
  //   return NextResponse.next();
  // }

  // if (!session) {
  //   const url = new URL('/login', request.url);
  //   return NextResponse.redirect(url);
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api|monitoring).*)'],
};
