import type { NextApiRequest, NextApiResponse } from 'next'

import { AESBase64Encryption } from '@/lib/utils/encryption'

const getCodeCallback = async (req: NextApiRequest, res: NextApiResponse) => {
  const { code } = req.query

  if (!code) {
    return res.redirect('/404')
  }

  const encryptedCode = AESBase64Encryption(String(code))

  return res.redirect(`/login?code=${encryptedCode}`)
}

export default getCodeCallback
