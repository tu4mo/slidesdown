import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Tooltip } from 'react-tippy'
import 'react-tippy/dist/tippy.css'

import presentationSvg from './svg/presentation.svg'
import shareSvg from './svg/share.svg'

const ICONS = {
  presentation: presentationSvg,
  share: shareSvg
}

const StyledIcon = styled.img`
  cursor: pointer;
  display: block;
  transition: transform 0.1s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`

const Icon = ({ alt, onClick, tooltip, type }) => {
  const icon = <StyledIcon alt={alt} onClick={onClick} src={ICONS[type]} />

  return tooltip ? (
    <Tooltip arrow title={tooltip}>
      {icon}
    </Tooltip>
  ) : (
    icon
  )
}

Icon.propTypes = {
  alt: PropTypes.string,
  onClick: PropTypes.func,
  tooltip: PropTypes.string,
  type: PropTypes.oneOf(Object.keys(ICONS))
}

export default Icon
