import styled, { injectGlobal } from 'styled-components'

import theme from './theme'

export const injectGlobalStyles = () => injectGlobal`
  * {
    box-sizing: border-box;
  }

  body {
    font-family: ${theme.fonts.default};
    margin: 0;
    padding: 0;
  }
`

export const StyledMain = styled.div`
  display: grid;
  grid-template: 'header header' 64px 'editor slides' auto / 1fr 3fr;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
`
