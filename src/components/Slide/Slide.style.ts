import styled from 'styled-components'
import { theme } from '../../theme'

export const StyledTransformContainer = styled.div`
  position: relative;

  &:not(:last-child) {
    margin-bottom: 1rem;

    @media (min-width: ${theme.breakpoints.xl}) {
      margin-bottom: 2rem;
    }
  }
`

export const StyledSlideContainer = styled.div<{
  $single?: boolean | undefined
}>`
  background-color: var(--color-slide);
  box-shadow: ${(props) => !props.$single && '0 0 0.1rem rgba(0, 0, 0, 0.1)'};
  border-radius: ${(props) => !props.$single && '0.25rem'};
  color: var(--color-text);
  display: flex;
  flex-direction: column;
  font-size: 120%;
  height: 450px;
  justify-content: center;
  left: 50%;
  overflow: hidden;
  padding: 2rem;
  position: absolute;
  top: 50%;
  width: 800px;

  h1 {
    text-align: center;
  }

  ol,
  ul {
    padding-left: 1.5em;
  }
`
