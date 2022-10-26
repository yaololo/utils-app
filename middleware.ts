// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { TokenInfoFE } from '@/interfaces/user'
import { verify } from './lib/jwt'

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()
  const jwtToken = request.cookies.get('token')

  if (!jwtToken) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  try {
    const token = await verify<TokenInfoFE>(
      jwtToken,
      String(process.env.JWT_SECRET)
    )

    response.headers.append('access-token', token.accessToken)
  } catch (error) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return response
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/home'],
}
