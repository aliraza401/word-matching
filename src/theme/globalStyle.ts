import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

  body {
    margin: 0;
    padding: 0;
    overscroll-behavior: contain;
    overscroll-behavior-y: none;
  }
  #root {
    background-color: #f0f2f5;
    max-width: 450px;
    margin: 0 auto;
    min-height: 100vh;
    height: 100vh;
  }
  @media (max-width: 450px) {
    #root {
      width: 100vw;
      overflow-x: hidden;
    }
  }
`;

export default GlobalStyle;
