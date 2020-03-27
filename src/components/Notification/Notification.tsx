import React, { FC, useEffect, useState } from 'react'
import styled, { css } from 'styled-components'

interface Props {
  className?: string
  timeout?: number
}

const Notification: FC<Props> = ({ children, className, timeout = 15000 }) => {
  const [hasTimedOut, setHasTimedOut] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setHasTimedOut(true), timeout)
    return () => clearTimeout(timer)
  }, [timeout])

  return !hasTimedOut ? <div className={className}>{children}</div> : null
}

const StyledNotification = styled(Notification)<{ slideDown?: boolean }>`
  color: ${(props) => props.theme.colors.purple};

  ${(props) =>
    props.slideDown &&
    css`
      animation: slide-down 1s ease-out;

      @keyframes slide-down {
        0% {
          opacity: 0;
          transform: translateY(-1rem);
        }
        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `};
`

export default StyledNotification
