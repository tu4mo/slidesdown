import styled from 'styled-components'

export const StyledImg = styled.img`
  ${props => props.onClick && 'cursor: pointer'};
  display: block;
  height: ${props => (props.large ? '5rem' : '2rem')};
  width: ${props => (props.large ? '5rem' : '2rem')};
`
