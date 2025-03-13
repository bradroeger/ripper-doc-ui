import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'manbow';
    src: url('/assets/fonts/ManbowLines.otf') format('opentype');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'Steampunk';
    src: url('/assets/fonts/Steam.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }
    body {
    font-family: 'Steampunk', sans-serif;
  }
`;

export default GlobalStyles;
