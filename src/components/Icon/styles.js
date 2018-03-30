import styled from 'styled-components'

export const StyledIcon = styled.img.attrs({})`
  cursor: pointer;
  display: block;
  opacity: ${props => (props.disabled ? 0.1 : 1)};
  transition: transform 0.1s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`
