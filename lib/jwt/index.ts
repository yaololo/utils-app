import { RecordType } from '@/interfaces/utils'
import { SignJWT, jwtVerify } from 'jose'

export const sign = async (
  payload: RecordType,
  secret: string
): Promise<string> => {
  const iat = Math.floor(Date.now() / 1000)
  //   const exp = iat + 60 * 60 // one hour

  return (
    new SignJWT({ ...payload })
      .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
      // .setExpirationTime(exp)
      .setIssuedAt(iat)
      .setNotBefore(iat)
      .sign(new TextEncoder().encode(secret))
  )
}

export const verify = async <T extends RecordType>(
  token: string,
  secret: string
): Promise<T & { iat: number; nbf: number }> => {
  const { payload } = await jwtVerify(token, new TextEncoder().encode(secret))
  // run some checks on the returned payload, perhaps you expect some specific values

  // if its all good, return it, or perhaps just return a boolean
  return payload as (T & { iat: number; nbf: number })
}
