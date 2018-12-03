import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

const Notification = ({ children, className, timeout }) => {
  const [hasTimedOut, setHasTimedOut] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setHasTimedOut(true), timeout || 15000)
    return () => clearTimeout(timer)
  }, [])

  return !hasTimedOut && <div className={className}>{children}</div>
}

Notification.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  timeout: PropTypes.number
}

const StyledNotification = styled(Notification)`
  color: ${props => props.theme.colors.purple};

  ${props =>
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

StyledNotification.propTypes = {
  slideDown: PropTypes.bool
}

export default StyledNotification
