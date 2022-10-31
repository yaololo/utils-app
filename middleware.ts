// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { RefreshedToken, TokenInfoFE } from '@/interfaces/user'
import { sign, verify } from './lib/jwt'
import { apiCaller } from './lib/api-caller'
import { setCookie } from './lib/cookie'

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
    let extractedAccessToken = token.accessToken

    const currentTimeInSeconds = Math.floor(Date.now() / 1000)
    const isTokenExpired = currentTimeInSeconds >= token.expiresIn + token.iat

    // if token expired, refresh the token
    if (isTokenExpired) {
      const clientId = String(process.env.CLIENT_ID)
      const clientSecret = String(process.env.CLIENT_SECRET)

      const refreshedToken = await apiCaller.POST<RefreshedToken, null>(
        `https://api.dropbox.com/oauth2/token?grant_type=refresh_token&refresh_token=${token.refreshToken}&client_id=${clientId}&client_secret=${clientSecret}`,
        null
      )

      if (refreshedToken.status === 'FAIL') {
        console.log(
          'getting refreshed token fail: ',
          refreshedToken.error.message
        )
        return NextResponse.redirect(new URL('/login', request.url))
      }

      // Remove iat and nbf attribute at it is added by jwt sign function
      const newToken = {
        accessToken: refreshedToken.data.access_token,
        tokenType: token.tokenType,
        scope: token.scope,
        uid: token.uid,
        accountId: token.accountId,
        expiresIn: refreshedToken.data.expires_in,
        refreshToken: token.refreshToken,
      }

      const serializeToken = await sign(
        newToken,
        String(process.env.JWT_SECRET)
      )
      setCookie(response, { token: { value: serializeToken } })
      extractedAccessToken = refreshedToken.data.access_token
    }

    response.headers.append('access-token', extractedAccessToken)
  } catch (error) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return response
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/home'],
}
