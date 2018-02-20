import styled from 'styled-components'

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
    animation: spinner-animation 1s infinite;
    animation-fill-mode: forwards;
    border: 1px solid ${props => props.theme.colors.purple};
    content: '';
    height: 2rem;
    width: 2rem;
  }

  @keyframes spinner-animation {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(180deg);
    }
  }
`


export default StyledSpinner
