import styled, { injectGlobal } from 'styled-components'

export const injectGlobalStyles = () => injectGlobal`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
  }
`

export const StyledMain = styled.div`
  display: flex;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
`

export const StyledSidebar = styled.div`
  border-right: 1px solid #eee;
  flex: 0 0 300px;
  position: relative;
`

export const StyledSlidesContainer = styled.div`
  flex: 1 1 auto;
  position: relative;
`
