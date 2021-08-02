import { createGlobalStyle } from 'styled-components';

import colors from './colors';

const GlobalStyle = createGlobalStyle`
  /* Default */
  * {
    box-sizing: border-box;
    margin: 0;
    outline: 0;
    padding: 0;
  }
  body {
    background-color: ${colors.background};
    text-rendering: optimizeLegibility !important;
    -webkit-font-smoothing: antialiased !important;
  }
  body, input, textarea {
    font-family: 'Ubuntu', sans-serif !important;
  }
  a, button {
    outline: none;
  }

  .page-container {
    width: 100%;
    height: 100%;
    // background-color: #00B9F4AA;
    // background-color: rgba(255, 255, 255, 0.7);
    position: absolute;
    top: 0;
    left: 0;
    animation: fadeIn 0.5s;
    .back-button {
      position: absolute;
      top: 5px;
      left: 5px;
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
