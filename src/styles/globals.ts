import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

:root {
  --primary: #0F123F;
  --color-text: #2C3E50;
  --secondary: #ff9f9f;
  --text-logo: #A7A7A7;
  --background: #ecf3fb;
  --white: #FFFFFF;
  --red: #F12B2C;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

  html {
    @media (max-width: 1080px) {
      font-size: 93.75%;
    }

    @media (max-width: 720px) {
      font-size: 87.5%;
    }
  }

  body {
    background: var(--background);
    color: var(--color-text);
    max-width: 100vw;
  }

  body, input, textarea, select, button {
    font-family: 'Maven Pro' , 'sans serif';

    h1 {
      font-style: normal;
      font-weight: 600;
      font-size: 30px;
      line-height: 45px;
      margin: 0;
    }

    p {
      margin: 0;
    }
  }

  textarea:focus, input:focus {
    box-shadow: 0 0 0 0;
    outline: 0;
  }

  button {
    cursor: pointer;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;