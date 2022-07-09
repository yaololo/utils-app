import React from "react";
import { ThemeProvider } from "styled-components";
import theme from "@/lib/utils/theme";
import GlobalStyle from "@/components/global-style";

type MyAppProps = {
  Component: React.FC;
  pageProps: any;
};

const MyApp = (props: MyAppProps) => {
  const { Component, pageProps } = props;

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
