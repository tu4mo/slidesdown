import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import {
  StyledModalContainer,
  StyledModal,
  StyledHeading,
  StyledModalCloseButton
} from './Modal.style'

const Modal = ({ children, heading, onClose }) => {
  const handleKeyDown = e => {
    if (e.keyCode === 27) {
      onClose()
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

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

Modal.propTypes = {
  children: PropTypes.node,
  heading: PropTypes.string,
  onClose: PropTypes.func.isRequired
}

export default Modal
