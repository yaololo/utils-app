import React, { useEffect, useCallback } from 'react'
import { ThemeProvider } from 'styled-components'
import theme from '@/lib/utils/theme'
import GlobalStyle from '@/components/global-style'
import { useRouter } from 'next/router'
import setLanguage from 'next-translate/setLanguage'
import message from '@/components/message'
import useNotification from '@/components/message/use-notification'

type MyAppProps = {
  Component: React.FC
  pageProps: any
}

const MyApp = (props: MyAppProps) => {
  const { Component, pageProps } = props
  const { locale } = useRouter()
  const [, holder] = useNotification()

  // const changeLocale = useCallback(async (local: string) => {
  //   await setLanguage(local)
  // }, [])

  // useEffect(() => {
  //   changeLocale(locale || 'en')
  // }, [locale])

  useEffect(() => {}, [])

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
        {holder}
      </ThemeProvider>
    </>
  )
}

export default MyApp
