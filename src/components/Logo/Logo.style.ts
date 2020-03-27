import styled from 'styled-components'

interface Props {
  large?: boolean
}

export const StyledImg = styled.img<Props>`
  ${(props) => props.onClick && 'cursor: pointer'};
  display: block;
  height: ${(props) => (props.large ? '5rem' : '2rem')};
  width: ${(props) => (props.large ? '5rem' : '2rem')};
`
