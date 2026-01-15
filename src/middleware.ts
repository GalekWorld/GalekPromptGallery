import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname

  // Protege /admin y todo lo que cuelgue de ahí
  if (path === '/admin' || path.startsWith('/admin/')) {
    const ok = req.cookies.get('admin')?.value === '1'
    if (!ok) {
      const url = req.nextUrl.clone()
      url.pathname = '/admin-login'
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/admin'],
}
