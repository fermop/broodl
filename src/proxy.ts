import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const cookie = request.cookies.get('broodl_session')
  const isLogged = !!cookie

  if (request.nextUrl.pathname.startsWith('/dashboard') && !isLogged) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (request.nextUrl.pathname.startsWith('/login') && isLogged) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }  

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/login'
  ],
}