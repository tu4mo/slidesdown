import styled from 'styled-components'

interface Props {
  large?: boolean
}

export const StyledImg = styled.img<Props>`
  cursor: ${(props) => props.onClick && 'pointer'};
  display: block;
  height: ${(props) => (props.large ? '5rem' : '2rem')};
  width: ${(props) => (props.large ? '5rem' : '2rem')};
`
