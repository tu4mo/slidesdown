import styled, { keyframes } from 'styled-components'

const spinnerAnimation = keyframes`
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(180deg);
  }
`

const StyledSpinner = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  left: 0;
  justify-content: center;
  position: absolute;
  top: 0;
  width: 100%;

  &::after {
    animation: ${spinnerAnimation} 1s infinite;
    animation-fill-mode: forwards;
    border: 2px solid var(--color-purple);
    border-radius: 4px;
    content: '';
    height: 2rem;
    width: 2rem;
  }
`

export { StyledSpinner as Spinner }
