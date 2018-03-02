import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

class Notification extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    timeout: PropTypes.number
  }

  state = {
    hasTimedOut: false
  }

  componentDidMount() {
    this.timer = setTimeout(() => {
      this.setState({ hasTimedOut: true })
    }, this.props.timeout || 15000)
  }

  componentWillUnmount() {
    clearTimeout(this.timer)
  }

  render() {
    const { children, className } = this.props
    const { hasTimedOut } = this.state

    return !hasTimedOut && <div className={className}>{children}</div>
  }
}

const StyledNotification = styled(Notification)`
  color: ${props => props.theme.colors.magenta};

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
