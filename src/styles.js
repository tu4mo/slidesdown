import { injectGlobal } from 'styled-components'

import theme from './theme'

export const injectGlobalStyles = () => injectGlobal`
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
`
