import styled from 'styled-components'
import { theme } from '../../theme'

export const StyledSingleSlideContainer = styled.div`
  align-items: center;
  background-color: #fff;
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
`

export const StyledSlidesContainer = styled.div`
  background-color: var(--color-background);
  height: 100%;
  left: 0;
  overflow: auto;
  padding: 1rem;
  position: absolute;
  scroll-behavior: smooth;
  top: 0;
  width: 100%;
  -webkit-overflow-scrolling: touch;

  @media (min-width: ${theme.breakpoints.xl}) {
    padding: 2rem;
  }
`
