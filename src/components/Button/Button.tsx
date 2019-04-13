import React, { FC, ReactNode } from 'react'

import { StyledButton } from './Button.style'

interface ButtonProps {
  children: ReactNode
  disabled?: boolean
  onClick(): void
}

const Button: FC<ButtonProps> = ({ children, disabled, onClick }) => (
  <StyledButton disabled={disabled} onClick={onClick}>
    {children}
  </StyledButton>
)

export default Button
