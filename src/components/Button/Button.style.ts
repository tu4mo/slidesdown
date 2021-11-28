import styled from 'styled-components'
import theme from '../../theme'

export const StyledButton = styled.button`
  background-color: #fff;
  border: 1px solid ${theme.colors.purple};
  color: ${theme.colors.purple};
  cursor: pointer;
  font-family: ${theme.fonts.default};
  font-size: 0.75rem;
  font-weight: bold;
  line-height: 2.375rem;
  outline: none;
  padding: 0 0.75rem;
  white-space: nowrap;

  @media (min-width: ${theme.breakpoints.md}) {
    font-size: 1rem;
    padding: 0 1rem;
  }

  &:focus {
    outline: 1px solid ${theme.colors.purple};
    outline-offset: 1px;
  }

  &:disabled {
    border-color: ${theme.colors.border};
    color: ${theme.colors.border};
    cursor: default;
  }

  &:hover:not(:disabled) {
    background-color: ${theme.colors.purple};
    color: #fff;
  }
`
