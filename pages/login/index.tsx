import React from 'react'
import Link from 'next/link'
import { GetStaticProps, InferGetServerSidePropsType } from 'next'

import Divider from '@/components/divider'
import styled from 'styled-components'

const Header = styled.header`
  height: 48px;
`

const LoginForm = styled.section`
  width: 350px;
  margin: 0 auto;
  padding-top: 30px;
  a {
    text-decoration: none;
    color: var(--text-color);
  }
`

const LoginContainer = styled.div`
  border: 1px solid var(--border-color);
  padding: 0 10px;
  border-radius: 4px;
  transition: 0.3s;

  :hover {
    border-color: #d2e3fc;
    background-color: #fafcfe;
  }

  span {
    border-radius: 4px;
    background-color: #0061fe;
    height: 32px;
    width: 32px;
  }

  p {
    width: 100%;
    text-align: center;
  }
`

const Login = ({
  loginUrl,
}: InferGetServerSidePropsType<typeof getStaticProps>) => {
  return (
    <>
      <Header></Header>
      <Divider />
      <LoginForm>
        <Link href={loginUrl}>
          <a>
            <LoginContainer className="flex align-center">
              <span className="flex justify-center align-center">
                <img src="/svg/dropbox.svg" alt="dropbox logo" />
              </span>
              <p>Login with Dropbox</p>
            </LoginContainer>
          </a>
        </Link>
      </LoginForm>
    </>
  )
}

export default Login

export const getStaticProps: GetStaticProps<{
  loginUrl: string
}> = async () => {
  // let userProfile: UserProfileFE = {
  //   accountId: '',
  //   name: {
  //     givenName: '',
  //     surname: '',
  //     familiarName: '',
  //     displayName: '',
  //     abbreviatedName: '',
  //   },
  //   email: '',
  //   country: '',
  //   locale: '',
  // }
  const loginUrl = `https://www.dropbox.com/oauth2/authorize?client_id=${process.env.CLIENT_ID}&response_type=code&redirect_uri=${process.env.REDIRECT_URI}`

  // if (!code) {
  //   return {
  //     props: { userProfile, loginUrl },
  //   }
  // }

  // console.log('code', code)

  // const result = await loginWithCode(res, String(code))

  // console.log(result)

  return {
    props: { loginUrl },
  }
}
