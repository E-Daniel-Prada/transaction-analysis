import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


export const config = {
  matcher: [
    '/login/:path*',
    '/signup/:path*',
  ]
}

export function middleware(request: NextRequest) {
  const cookiespayment = cookies()
  const accessToken = cookiespayment.get('accessToken')?.value
  if(accessToken){
    return NextResponse.redirect(new URL('/payment', request.url))
  }
}
 