import styled from 'styled-components'

export const StyledSidebar = styled.div`
  box-shadow: 0 0 2rem rgba(0, 0, 0, 0.1);
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 1;

  @media (min-width: ${(props) => props.theme.breakpoints.md}) {
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
