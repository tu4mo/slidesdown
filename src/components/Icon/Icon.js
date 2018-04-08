import React from 'react'
import PropTypes from 'prop-types'
import { Tooltip } from 'react-tippy'
import 'react-tippy/dist/tippy.css'

import { StyledIcon } from './Icon.style'

import crossSvg from './svg/cross.svg'
import leftSvg from './svg/left.svg'
import presentationSvg from './svg/presentation.svg'
import rightSvg from './svg/right.svg'
import shareSvg from './svg/share.svg'

const ICONS = {
  cross: crossSvg,
  left: leftSvg,
  presentation: presentationSvg,
  right: rightSvg,
  share: shareSvg
}

const Icon = ({ alt, disabled, onClick, tooltip, type }) => {
  const icon = (
    <StyledIcon
      alt={alt}
      disabled={disabled}
      onClick={!disabled ? onClick : null}
      src={ICONS[type]}
    />
  )

  return tooltip ? (
    <Tooltip arrow html={tooltip}>
      {icon}
    </Tooltip>
  ) : (
    icon
  )
}

Icon.propTypes = {
  alt: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  tooltip: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  type: PropTypes.oneOf(Object.keys(ICONS))
}

export default Icon
