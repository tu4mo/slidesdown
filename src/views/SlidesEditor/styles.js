import styled from 'styled-components'

export const StyledSidebar = styled.div`
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    border: 0;
  }
`

export const StyledSlidesContainer = styled.div`
  height: 100%;
  left: 0;
  overflow: hidden;
  position: absolute;
  top: 0;
  width: 100%;
`
