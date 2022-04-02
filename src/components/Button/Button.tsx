import { ReactNode } from 'react'

import { StyledButton } from './Button.style'

interface ButtonProps {
  children: ReactNode
  disabled?: boolean
  onClick(): void
}

const Button = ({ children, disabled, onClick }: ButtonProps) => (
  <StyledButton
    disabled={disabled}
    onClick={onClick}
  >
    {children}
  </StyledButton>
)

export default Button
