import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledModalContainer = styled.div`
  align-items: center;
  background-color: rgba(51, 51, 51, 0.5);
  height: 100%;
  display: flex;
  justify-content: center;
  left: 0;
  padding: 1rem;
  position: fixed;
  top: 0;
  width: 100%;
`

const StyledModal = styled.div`
  background-color: #fff;
  padding: 2rem;
  max-width: 720px;
`

class Modal extends Component {
  static propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown)
  }

  handleKeyDown = e => {
    if (e.keyCode === 27) {
      this.props.onClose()
    }
  }

  render() {
    const { children, onClose } = this.props

    return (
      <StyledModalContainer onClick={onClose}>
        <StyledModal onClick={e => e.stopPropagation()}>{children}</StyledModal>
      </StyledModalContainer>
    )
  }
}

export default Modal
