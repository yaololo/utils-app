import React from 'react'
import Link from 'next/link'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

import Divider from '@/components/divider'
import styled from 'styled-components'
import { UserProfileFE } from '@/interfaces/user'

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
  token,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <Header></Header>
      <Divider />
      {error && <div>{error.message}</div>}
      {token ? (
        <>welcome to the website</>
      ) : (
        <LoginForm>
          <Link href="https://www.dropbox.com/oauth2/authorize?client_id=q4tzjs9a67zqir6&response_type=code&redirect_uri=http://localhost:3000/api/auth/get-code-callback">
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
      )}
    </>
  )
}

export default Login

export const getServerSideProps: GetServerSideProps<{
  token: string | null
  error: Error | null
  userProfile: UserProfileFE
}> = async ({ query }) => {
  const { code } = query
  let token = null
  let error = null
  let userProfile: UserProfileFE = {
    accountId: '',
    name: {
      givenName: '',
      surname: '',
      familiarName: '',
      displayName: '',
      abbreviatedName: '',
    },
    email: '',
    country: '',
    locale: '',
  }

  // User code to get token and user profile

  return {
    props: { token: token || null, error, userProfile },
  }
}
