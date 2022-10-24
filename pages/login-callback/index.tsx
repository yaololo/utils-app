import { NextPage } from 'next'

import { UserProfileFE } from '@/interfaces/user'
import { loginWithCode } from './helpers'
import { useRouter } from 'next/router'
import message from '@/components/message'
import useRenderOnce from '@/hooks/use-render-once'

type Props = {
  userProfile?: UserProfileFE
  isLoginFail?: boolean
  userAgent?: string
}

const LoginCallback: NextPage<Props> = ({ isLoginFail }) => {
  const router = useRouter()

  useRenderOnce(() => {
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
    return { isLoginFail: true }
  }

  const userProfile = result.data

  return {
    userProfile,
  }
}
