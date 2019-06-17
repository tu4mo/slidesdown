import React, { FC, ReactNode } from 'react'

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

interface Props {
  alt?: string
  disabled?: boolean
  onClick?(): void
  tooltip?: ReactNode
  type: keyof typeof ICONS
}

const Icon: FC<Props> = ({ alt, disabled = false, onClick, tooltip, type }) => {
  const icon = (
    <StyledIcon
      alt={alt}
      disabled={disabled}
      onClick={!disabled ? onClick : undefined}
      src={ICONS[type]}
    />
  )

  return tooltip ? <Tooltip html={tooltip}>{icon}</Tooltip> : icon
}

export default Icon
