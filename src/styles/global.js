import { createGlobalStyle } from 'styled-components';

import colors from './colors';

const GlobalStyle = createGlobalStyle`
  /* Default */
  * {
    box-sizing: border-box;
    user-select: none;
    margin: 0;
    outline: 0;
    padding: 0;
  }
  body {
    background-color: ${colors.background};
    text-rendering: optimizeLegibility !important;
    -webkit-font-smoothing: antialiased !important;
  }
  html, body, #root {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  body, input, textarea {
    font-family: 'Ubuntu', sans-serif !important;
  }
  a, button {
    outline: none;
  }
  h2 {
    margin-bottom: .5em;
  }
  p {
    margin-bottom: 1.5em;
  }

  .page-container {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    animation: fadeIn 0.5s;
    pointer-events: none;
    // * {
    //   pointer-events: auto;
    // }
    .back-button {
      cursor: pointer;
      margin-bottom: 0.7em;
      pointer-events: auto;
    }
    .page-content {
      width: 50%;
      padding: 7% 10%;

      &.is-right {
        margin-left: auto;
      }
    }
    h2 {
      font-family: roboto slab,helvetica,arial,sans-serif;
      font-weight: 300;
      font-size: 2.8125em;
      line-height: 1.11111111em;
    }
    p {
      font-family: source sans pro,helvetica,arial,sans-serif;
    }
  }

  canvas {
    user-select: none;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
  
    to {
      opacity: 1;
    }
  }
`;

export default GlobalStyle;
