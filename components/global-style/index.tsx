import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
  }

  :before, *:after {
    box-sizing: inherit;
  }

  * {
    scroll-behavior: smooth;
    margin: 0;
    padding: 0;
  }



  #root {
    width: 100vw;
    height: 100vh;
    overflow: auto;
    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active  {
        -webkit-box-shadow: 0 0 0 30px white inset !important;
    }
  }
`;

export default GlobalStyle;
