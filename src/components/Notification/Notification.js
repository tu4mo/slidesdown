import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledNotification = styled.div`
  color: ${props => props.theme.colors.magenta};
`

class Notification extends Component {
  state = {
    hasTimedOut: false
  }

  componentDidMount() {
    this.timer = setTimeout(() => {
      this.setState({ hasTimedOut: true })
    }, 15000)
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

Notification.propTypes = {
  children: PropTypes.node
}

export default Notification
