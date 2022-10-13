import CryptoJS from 'crypto-js'

export const AESBase64Encryption = (value: string) => {
  if (!value) return ''

  const encryptedBase64 = CryptoJS.AES.encrypt(
    value,
    String(process.env.CODE_SALT)
  ).toString()

  return encryptedBase64
}

export const AESBase64Decryption = (encryptedBase64: string) => {
  if (!encryptedBase64) return ''

  const decryptedValue = CryptoJS.AES.decrypt(
    encryptedBase64,
    String(process.env.CODE_SALT)
  ).toString(CryptoJS.enc.Utf8)

  return decryptedValue
}
