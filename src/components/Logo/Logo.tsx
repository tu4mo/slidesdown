import { Ref } from 'react'
import styles from './Logo.module.css'

import logoSvg from './logo.svg'

type Props = {
  large?: boolean
  onClick?(): void
  ref?: Ref<HTMLImageElement>
}

export function Logo({ large, onClick, ref }: Props) {
  const className = large ? `${styles.logo} ${styles.large}` : styles.logo

  return (
    <img
      className={className}
      alt="Slidesdown"
      onClick={onClick}
      ref={ref}
      src={logoSvg}
      style={onClick ? { cursor: 'pointer' } : undefined}
    />
  )
}
