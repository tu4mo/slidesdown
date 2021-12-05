import { ComponentProps } from 'react'

import Tooltip from '../Tooltip'

import { StyledButton, StyledIcon } from './Icon.style'

import crossSvg from './svg/cross.svg'
import editSvg from './svg/edit.svg'
import leftSvg from './svg/left.svg'
import maximizeSvg from './svg/maximize.svg'
import minimizeSvg from './svg/minimize.svg'
import presentationSvg from './svg/presentation.svg'
import rightSvg from './svg/right.svg'
import shareSvg from './svg/share.svg'

const ICONS = {
  cross: crossSvg,
  edit: editSvg,
  left: leftSvg,
  maximize: maximizeSvg,
  minimize: minimizeSvg,
  presentation: presentationSvg,
  right: rightSvg,
  share: shareSvg,
}

interface Props {
  alt?: string
  disabled?: boolean
  onClick?(): void
  tooltip?: ComponentProps<typeof Tooltip>['content']
  type: keyof typeof ICONS
}

const Icon = ({ alt, disabled = false, onClick, tooltip, type }: Props) => {
  const icon = (
    <StyledButton
      aria-label={alt}
      disabled={disabled}
      onClick={!disabled ? onClick : undefined}
    >
      <StyledIcon src={ICONS[type]} />
    </StyledButton>
  )

  return tooltip ? <Tooltip content={tooltip}>{icon}</Tooltip> : icon
}

export default Icon
