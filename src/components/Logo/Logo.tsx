import React, { FC } from 'react'

import { StyledImg } from './Logo.style'

import logoSvg from './logo.svg'

interface Props {
  onClick?(): void
  large?: boolean
}

const Logo: FC<Props> = ({ onClick, large }) => (
  <StyledImg
    alt="Slidesdown"
    large={large}
    onClick={onClick || undefined}
    src={logoSvg}
  />
)

export default Logo
