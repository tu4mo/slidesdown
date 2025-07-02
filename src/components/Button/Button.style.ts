import styled from 'styled-components'

export const StyledButton = styled.button`
  background-color: #fff;
  border: 1px solid var(--color-purple);
  color: var(--color-purple);
  cursor: pointer;
  font-family: var(--font-default);
  font-size: 0.75rem;
  font-weight: bold;
  line-height: 2.375rem;
  outline: none;
  padding: 0 0.75rem;
  white-space: nowrap;

  @media (min-width: 576px) {
    font-size: 1rem;
    padding: 0 1rem;
  }

  &:focus {
    outline: 1px solid var(--color-purple);
    outline-offset: 1px;
  }

  &:disabled {
    border-color: var(--color-border);
    color: var(--color-border);
    cursor: default;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-purple);
    color: #fff;
  }
`
