import React from 'react'
import PropTypes from 'prop-types'

import Tooltip from '../Tooltip'

import { StyledIcon } from './Icon.style'

import crossSvg from './svg/cross.svg'
import leftSvg from './svg/left.svg'
import maximizeSvg from './svg/maximize.svg'
import minimizeSvg from './svg/minimize.svg'
import presentationSvg from './svg/presentation.svg'
import rightSvg from './svg/right.svg'
import shareSvg from './svg/share.svg'

const ICONS = {
  cross: crossSvg,
  left: leftSvg,
  maximize: maximizeSvg,
  minimize: minimizeSvg,
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

  return tooltip ? <Tooltip html={tooltip}>{icon}</Tooltip> : icon
}

Icon.propTypes = {
  alt: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  tooltip: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  type: PropTypes.oneOf(Object.keys(ICONS))
}

export default Icon
