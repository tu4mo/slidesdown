import styled from 'styled-components'

export const StyledButton = styled.button`
  background-color: #fff;
  border: 1px solid ${props => props.theme.colors.purple};
  color: ${props => props.theme.colors.purple};
  cursor: pointer;
  font-family: ${props => props.theme.fonts.default};
  font-size: 0.75rem;
  font-weight: bold;
  line-height: 2.375rem;
  outline: none;
  padding: 0 0.75rem;
  white-space: nowrap;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 1rem;
    padding: 0 1rem;
  }

  &:focus {
    outline: 1px solid ${props => props.theme.colors.purple};
    outline-offset: 1px;
  }

  &:disabled {
    border-color: ${props => props.theme.colors.border};
    color: ${props => props.theme.colors.border};
    cursor: default;
  }

  &:hover:not(:disabled) {
    background-color: ${props => props.theme.colors.purple};
    color: #fff;
  }
`
