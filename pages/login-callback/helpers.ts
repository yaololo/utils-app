import type { GetServerSidePropsContext } from 'next'
import { serialize, CookieSerializeOptions } from 'cookie'

import { apiCaller } from '@/lib/api-caller'
import { TokenInfoBE, UserProfileBE, UserProfileFE } from '@/interfaces/user'
import { setSuccess } from '@/lib/utils/remote-data'
import { Fail, Success } from '@/interfaces/utils'
import { ServerResponse } from 'http'
import { sign } from '@/lib/jwt'

const setCookie = (
  res: GetServerSidePropsContext['res'],
  value: Record<string, { value: string; options?: CookieSerializeOptions }>
) => {
  const expireDate = new Date()
  // Keep it alive for 14 days
  expireDate.setDate(expireDate.getDate() + 14)

  const options: CookieSerializeOptions = {
    httpOnly: true,
    sameSite: 'lax',
    secure: true,
    expires: expireDate,
  }

  const cookieValues = Object.entries(value).map(([key, data]) => {
    const mergedOptions = data.options
      ? { ...options, ...data.options }
      : options
    return serialize(key, data.value, mergedOptions)
  })

  res.setHeader('Set-Cookie', cookieValues)
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

  const accessToken = await sign(mappedTokenInfo, String(process.env.JWT_SECRET))
  const mappedUserProfile = {
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
  }

  const userProfileToken =  await sign(
    mappedUserProfile,
    String(process.env.JWT_SECRET)
  )

  setCookie(res, {
    token: { value: accessToken },
    userProfile: { value: userProfileToken, options: { httpOnly: false } },
  })
  return setSuccess(mappedUserProfile)
}
