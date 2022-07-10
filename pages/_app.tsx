import React, { useEffect, useCallback } from "react";
import { ThemeProvider } from "styled-components";
import theme from "@/lib/utils/theme";
import GlobalStyle from "@/components/global-style";
import { useRouter } from "next/router";
import setLanguage from "next-translate/setLanguage";

type MyAppProps = {
  Component: React.FC;
  pageProps: any;
};

const MyApp = (props: MyAppProps) => {
  const { Component, pageProps } = props;
  const { locale } = useRouter();

  const changeLocale = useCallback(async (local: string) => {
    await setLanguage(local);
  }, []);

  useEffect(() => {
    changeLocale(locale || "en");
  }, [locale]);

  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </React.StrictMode>
  );
};

export default MyApp;
