import type { GetServerSidePropsContext } from 'next'
import { serialize, CookieSerializeOptions } from 'cookie'
import { NextResponse } from 'next/server'

type Value = Record<string, { value: string; options?: CookieSerializeOptions }>

export const setCookie = (
  res: GetServerSidePropsContext['res'] | NextResponse,
  value: Value
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

  if (res instanceof NextResponse) {
    setCookieFromMiddleware(res, value, options)
  } else {
    setCookieFromServerSide(res, value, options)
  }
}

const setCookieFromMiddleware = (
  res: NextResponse,
  value: Value,
  defaultOptions: CookieSerializeOptions
) =>
  Object.entries(value).forEach(([key, data]) => {
    const mergedOptions = data.options
      ? { ...defaultOptions, ...data.options }
      : defaultOptions
    res.cookies.set(key, data.value, mergedOptions)
  })

const setCookieFromServerSide = (
  res: GetServerSidePropsContext['res'],
  value: Value,
  defaultOptions: CookieSerializeOptions
) => {
  const cookieValues = Object.entries(value).map(([key, data]) => {
    const mergedOptions = data.options
      ? { ...defaultOptions, ...data.options }
      : defaultOptions
    return serialize(key, data.value, mergedOptions)
  })

  res.setHeader('Set-Cookie', cookieValues)
}
