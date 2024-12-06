import { Ref } from 'react'
import { StyledImg } from './Logo.style'

import logoSvg from './logo.svg'

interface Props {
  large?: boolean
  onClick?(): void
  ref?: Ref<HTMLImageElement>
}

const Logo = ({ large, onClick, ref }: Props) => (
  <StyledImg
    $large={large}
    alt="Slidesdown"
    onClick={onClick}
    ref={ref}
    src={logoSvg}
  />
)

Logo.displayName = 'Logo'

export { Logo }
