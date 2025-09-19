import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'
import { NextRequest, NextResponse } from 'next/server'

export default createMiddleware(routing)

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
}

export function middleware(request: NextRequest) {
  // Example: Redirecting to a specific locale if a condition is met
  // This is a simplified example; adjust logic based on your needs
  if (request.nextUrl.pathname === '/en' || request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/fa', request.url))
  }

  return NextResponse.next()
}
