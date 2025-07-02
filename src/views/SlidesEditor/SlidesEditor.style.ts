import styled from 'styled-components'

export const StyledSidebar = styled.div`
  box-shadow: var(--shadow-big);
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 1;

  @media (min-width: 576px) {
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
