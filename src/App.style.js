import { createGlobalStyle } from 'styled-components'

import theme from './theme'

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  a {
    color: ${theme.colors.magenta};
  }

  body {
    font-family: ${theme.fonts.default};
    line-height: 1.4;
    margin: 0;
    padding: 0;
  }

  code {
    font-family: ${theme.fonts.monospace};
  }

  .Resizer {
    z-index: 1;
  }

  .Resizer.horizontal {
    cursor: row-resize;
    height: 10px;
    margin: -5px 0;
    padding: 5px 0;
    width: 100%;
  }

  .Resizer.vertical {
    cursor: col-resize;
    margin: 0 -5px;
    padding: 0 5px;
    width: 10px;
  }
`
