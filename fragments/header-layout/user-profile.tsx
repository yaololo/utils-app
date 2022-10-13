import React, { useCallback, useEffect } from 'react'
import Link from 'next/link'

import { apiCaller } from '@/lib/api-caller'
import { SettingsWrapper } from './styles'

const UserProfile = () => {
  const oAuth = useCallback(() => {
    const uri = 'http://localhost:3000'
    const clientId = 'q4tzjs9a67zqir6'
    const url =
      'https://www.dropbox.com/oauth2/authorize?client_id=q4tzjs9a67zqir6&response_type=code&redirect_uri=http://localhost:3000'

    try {
      window.location.href = url

      //   const response = apiCaller.GET(url)
    } catch (error) {
      console.log(error)
    }
  }, [])

  return (
    <SettingsWrapper>
      <Link href="/login">
        <a>Login</a>
      </Link>
    </SettingsWrapper>
  )
}

export default UserProfile
