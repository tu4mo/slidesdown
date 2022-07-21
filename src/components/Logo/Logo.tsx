import { forwardRef } from 'react'

import { StyledImg } from './Logo.style'

import logoSvg from './logo.svg'

interface Props {
  large?: boolean
  onClick?(): void
}

const Logo = forwardRef<HTMLImageElement, Props>(({ large, onClick }, ref) => (
  <StyledImg
    alt="Slidesdown"
    large={large}
    onClick={onClick}
    ref={ref}
    src={logoSvg}
  />
))

export { Logo }
