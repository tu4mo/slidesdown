import styled from 'styled-components'

export const StyledButton = styled.button`
  background-color: transparent;
  border: 0;
  cursor: pointer;
  display: block;
  padding: 0;
  transition: transform 0.1s ease-in-out;

  &:disabled {
    opacity: 0.1;
  }

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.98);
  }
`

export const StyledIcon = styled.img`
  display: block;
`
