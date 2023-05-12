import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Lobster&display=swap');

  body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
    background-color: black;
  }
  #root {
    background-color: #f0f2f5;
    max-width: 450px;
    padding-left: 10px;
    padding-right: 10px;
    margin: 0 auto;
    min-height: 100vh;
  }
  .word-container {
    /* font-family: 'Lobster', sans-serif; */
    text-align: center;
    margin-bottom: 1rem;
  }
`;

export default GlobalStyle;
