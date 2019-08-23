import React, { FC } from 'react'

import { StyledImg } from './Logo.style'

import logoSvg from './logo.svg'

interface Props {
  large?: boolean
  onClick?(): void
}

const Logo: FC<Props> = ({ large, onClick }) => (
  <StyledImg
    alt="Slidesdown"
    large={large}
    onClick={onClick || undefined}
    src={logoSvg}
  />
)

export default Logo
