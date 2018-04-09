import React from 'react'
import PropTypes from 'prop-types'

import { StyledImg } from './Logo.style'

import logoSvg from './logo.svg'

const Logo = ({ onClick, large }) => (
  <StyledImg
    alt="Slidesdown"
    large={large}
    onClick={onClick || null}
    src={logoSvg}
  />
)

Logo.propTypes = {
  large: PropTypes.bool,
  onClick: PropTypes.func
}

export default Logo
