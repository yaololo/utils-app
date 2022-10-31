import { useRecoilState } from 'recoil'
import jwt from 'jsonwebtoken'
import cookies from 'cookie'

import { userProfileAtom } from '@/store/auth'
import { setFetchFail, setSuccess } from '@/lib/utils/remote-data'
import { UserProfileFE } from '@/interfaces/user'
import useRenderOnce from './use-render-once'
import { useCallback } from 'react'

const useUserProfile = () => {
  const [userProfile, setUserProfile] = useRecoilState(userProfileAtom)

  const callback = useCallback(() => {
    if (userProfile.status === 'UN_SET') {
      try {
        const userProfileJWT = cookies.parse(document.cookie).userProfile

        if (!userProfileJWT) {
          setUserProfile(setFetchFail(new Error('Fail retrieve user data')))
        } else {
          // Decode JWT
          const userInfo = jwt.verify(
            userProfileJWT,
            String(process.env.NEXT_PUBLIC_JWT_SECRET)
          ) as UserProfileFE

          setUserProfile(setSuccess(userInfo))
        }
      } catch (error) {
        setUserProfile(setFetchFail(new Error('Fail retrieve user data')))
      }
    }
  }, [userProfile])

  useRenderOnce(callback)

  return userProfile
}

export default useUserProfile
