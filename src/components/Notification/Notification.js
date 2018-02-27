import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledNotification = styled.div`
  color: ${props => props.theme.colors.magenta};
`

class Notification extends Component {
  static propTypes = {
    children: PropTypes.node,
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
    const { children } = this.props
    const { hasTimedOut } = this.state

    return !hasTimedOut && <StyledNotification>{children}</StyledNotification>
  }
}

export default Notification
