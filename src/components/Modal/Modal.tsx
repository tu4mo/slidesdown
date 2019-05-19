import React, { FC, useEffect, ReactNode } from 'react'

import {
  StyledModalContainer,
  StyledModal,
  StyledHeading,
  StyledModalCloseButton
} from './Modal.style'

interface Props {
  children: ReactNode
  heading?: string
  onClose(): void
}

const Modal: FC<Props> = ({ children, heading, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.keyCode === 27) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

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

export default Modal
