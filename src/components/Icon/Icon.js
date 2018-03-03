import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import presentationSvg from './svg/presentation.svg'
import shareSvg from './svg/share.svg'

const ICONS = {
  presentation: presentationSvg,
  share: shareSvg
}

const StyledIcon = styled.img`
  cursor: pointer;
  transition: transform 0.1s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`

const Icon = ({ onClick, title, type }) => (
  <StyledIcon onClick={onClick} src={ICONS[type]} title={title} />
)

Icon.propTypes = {
  onClick: PropTypes.func,
  title: PropTypes.string,
  type: PropTypes.oneOf(Object.keys(ICONS))
}

export default Icon
