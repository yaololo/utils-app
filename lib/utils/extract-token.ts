import type { ServerResponse } from 'http'

/**
 * After next middleware auth verification, extract access-token from response header,
 * and delete the token from response header to avoid exposing it to client
 */
export const extractHeader = (res: ServerResponse): string => {
  const token = res.getHeader('access-token')
  res.removeHeader('access-token')

  return String(token)
}
