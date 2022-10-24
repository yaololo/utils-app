import type { GetServerSidePropsContext } from 'next'
import jwt from 'jsonwebtoken'
import { serialize, CookieSerializeOptions } from 'cookie'

import { apiCaller } from '@/lib/api-caller'
import { TokenInfoBE, UserProfileBE, UserProfileFE } from '@/interfaces/user'
import { setSuccess } from '@/lib/utils/remote-data'
import { Fail, Success } from '@/interfaces/utils'
import { ServerResponse } from 'http'

const setCookie = (res: GetServerSidePropsContext['res'], token: string) => {
  const expireDate = new Date()
  // Keep it alive for 14 days
  expireDate.setDate(expireDate.getDate() + 14)

  const options: CookieSerializeOptions = {
    httpOnly: true,
    sameSite: 'lax',
    secure: true,
    expires: expireDate,
  }
  res.setHeader('Set-Cookie', serialize('token', token, options))
}

export const loginWithCode: (
  res: ServerResponse,
  code: string
) => Promise<Fail | Success<UserProfileFE>> = async (res, code) => {
  // Get token
  const clientId = String(process.env.CLIENT_ID)
  const clientSecret = String(process.env.CLIENT_SECRET)
  const redirectUri = String(process.env.REDIRECT_URI)
  const tokenInfo = await apiCaller.POST<TokenInfoBE, null>(
    `https://api.dropbox.com/oauth2/token?code=${code}&grant_type=authorization_code&client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=${redirectUri}`,
    null
  )

  if (tokenInfo.status === 'FAIL') {
    console.log(tokenInfo.error.message)
    return tokenInfo
  }

  const mappedTokenInfo = {
    accessToken: tokenInfo.data.access_token,
    tokenType: tokenInfo.data.token_type,
    scope: tokenInfo.data.scope,
    uid: tokenInfo.data.uid,
    accountId: tokenInfo.data.account_id,
    expiresIn: tokenInfo.data.expires_in,
  }

  const userProfile = await apiCaller.POST<UserProfileBE, null>(
    'https://api.dropboxapi.com/2/users/get_current_account',
    null,
    {
      Authorization: `Bearer ${mappedTokenInfo.accessToken}`,
    }
  )

  if (userProfile.status === 'FAIL') {
    console.log(userProfile.error.message)
    return userProfile
  }

  const token = jwt.sign(mappedTokenInfo, String(process.env.JWT_SECRET))

  setCookie(res, token)
  return setSuccess({
    accountId: userProfile.data.account_id,
    name: {
      givenName: userProfile.data.name.given_name,
      surname: userProfile.data.name.surname,
      familiarName: userProfile.data.name.familiar_name,
      displayName: userProfile.data.name.display_name,
      abbreviatedName: userProfile.data.name.abbreviated_name,
    },
    email: userProfile.data.email,
    country: userProfile.data.country,
    locale: userProfile.data.locale,
  })
}
