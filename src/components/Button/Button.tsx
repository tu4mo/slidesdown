import { ReactNode } from 'react'

import { StyledButton } from './Button.style'

interface ButtonProps {
  children: ReactNode
  disabled?: boolean
  onClick(): void
}

function Button({ children, disabled, onClick }: ButtonProps) {
  return (
    <StyledButton
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  )
}

export { Button }
