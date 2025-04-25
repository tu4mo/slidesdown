import { ReactNode, useEffect, useState } from 'react'
import styled, { css, keyframes } from 'styled-components'

type Props = {
  children: ReactNode
  className?: string
  timeout?: number
}

const Notification = ({ children, className, timeout = 15000 }: Props) => {
  const [hasTimedOut, setHasTimedOut] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setHasTimedOut(true), timeout)
    return () => clearTimeout(timer)
  }, [timeout])

  return !hasTimedOut ? <div className={className}>{children}</div> : null
}

const slideDown = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-1rem);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
`

const StyledNotification = styled(Notification)<{ $slideDown?: boolean }>`
  ${(props) =>
    props.$slideDown &&
    css`
      animation: ${slideDown} 1s ease-out;
    `};

  color: var(--color-purple);
`

export { StyledNotification as Notification }
