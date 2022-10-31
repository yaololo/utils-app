import { NextPage } from 'next'
import { useRecoilState } from 'recoil'

import { UserProfileFE } from '@/interfaces/user'
import { loginWithCode } from './helpers'
import { useRouter } from 'next/router'
import message from '@/components/message'
import useRenderOnce from '@/hooks/use-render-once'
import { userProfileAtom } from '@/store/auth'
import { BaseData } from '@/interfaces/utils'

type Props = {
  userProfile?: BaseData<UserProfileFE>
  isLoginFail?: boolean
  userAgent?: string
}

const LoginCallback: NextPage<Props> = ({ isLoginFail, userProfile }) => {
  const router = useRouter()
  const [, setUserProfile] = useRecoilState(userProfileAtom)

  useRenderOnce(() => {
    if (userProfile) {
      setUserProfile(userProfile)
    }

    if (isLoginFail) {
      message.error('login fail')
      router.push('/login')
    } else {
      router.push('/home')
    }
  })

  return null
}

export default LoginCallback

LoginCallback.getInitialProps = async ({ query, res }) => {
  // handle code absent
  const { code } = query

  if (!code || !res) {
    return { isLoginFail: true }
  }

  // Handle login
  const result = await loginWithCode(res, String(code))

  if (result.status === 'FAIL') {
    return { isLoginFail: true, userProfile: result }
  }

  return {
    userProfile: result,
  }
}
