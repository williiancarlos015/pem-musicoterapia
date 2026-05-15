import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {

  const token = request.cookies.get(
    'sb-access-token'
  )

  const rotaProtegida =
    request.nextUrl.pathname.startsWith('/dashboard') ||
    request.nextUrl.pathname.startsWith('/pacientes') ||
    request.nextUrl.pathname.startsWith('/sessoes') ||
    request.nextUrl.pathname.startsWith('/agenda') ||
    request.nextUrl.pathname.startsWith('/relatorios')

  if (rotaProtegida && !token) {

    return NextResponse.redirect(
      new URL('/', request.url)
    )
  }

  return NextResponse.next()
}