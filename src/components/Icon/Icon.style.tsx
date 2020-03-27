import styled from 'styled-components'

interface Props {
  isDisabled: boolean
}

export const StyledIcon = styled.img.attrs({})<Props>`
  cursor: pointer;
  display: block;
  opacity: ${(props) => (props.isDisabled ? 0.1 : 1)};
  transition: transform 0.1s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.98);
  }
`
