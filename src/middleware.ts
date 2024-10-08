import { NextResponse, type NextRequest } from 'next/server';

import { createClient } from './utils/supabase/server';

export async function middleware(request: NextRequest) {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api|monitoring).*)'],
};
