import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  StyledModalContainer,
  StyledModal,
  StyledHeading,
  StyledModalCloseButton
} from './Modal.style'

class Modal extends Component {
  static propTypes = {
    children: PropTypes.node,
    heading: PropTypes.string,
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
    const { children, heading, onClose } = this.props

    return (
      <StyledModalContainer onClick={onClose}>
        <StyledModal onClick={e => e.stopPropagation()}>
          {heading && <StyledHeading>{heading}</StyledHeading>}
          {children}
          <StyledModalCloseButton onClick={onClose} />
        </StyledModal>
      </StyledModalContainer>
    )
  }
}

export default Modal
