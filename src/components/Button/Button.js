import React from 'react'
import PropTypes from 'prop-types'

import { StyledButton } from './Button.style'

const Button = ({ children, disabled, onClick }) => (
  <StyledButton disabled={disabled} onClick={onClick}>
    {children}
  </StyledButton>
)

Button.propTypes = {
  children: PropTypes.node,
  disabled: PropTypes.bool,
  onClick: PropTypes.func
}

export default Button
