import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledButton = styled.button`
  background-color: ${props => props.theme.colors.purple};
  border: 0;
  border-radius: 0.5rem;
  color: #fff;
  cursor: pointer;
  font-family: ${props => props.theme.fonts.default};
  font-size: 1rem;
  outline: none;
  padding: 0.5rem 1rem;
`

const Button = ({ children, onClick }) => (
  <StyledButton onClick={onClick}>{children}</StyledButton>
)

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func.isRequired
}

export default Button
