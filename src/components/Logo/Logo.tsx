import React, { forwardRef } from 'react'

import { StyledImg } from './Logo.style'

import logoSvg from './logo.svg'

type Ref = HTMLImageElement

interface Props {
  large?: boolean
  onClick?(): void
}

const Logo = forwardRef<Ref, Props>(({ large, onClick }, ref) => (
  <StyledImg
    alt="Slidesdown"
    large={large}
    onClick={onClick}
    ref={ref}
    src={logoSvg}
  />
))

export default Logo
