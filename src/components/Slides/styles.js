import styled from 'styled-components'

export const StyledSingleSlideContainer = styled.div`
  align-items: center;
  background-color: ${props => props.theme.colors.background};
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
`

export const StyledSlidesContainer = styled.div`
  background-color: ${props => props.theme.colors.background};
  height: 100%;
  left: 0;
  overflow: auto;
  padding: 1rem;
  position: absolute;
  top: 0;
  width: 100%;
  -webkit-overflow-scrolling: touch;

  @media (min-width: ${props => props.theme.breakpoints.xl}) {
    padding: 2rem;
  }
`
