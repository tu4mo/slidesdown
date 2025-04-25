import { useEffect, ReactNode } from 'react'

import {
  StyledModalContainer,
  StyledModal,
  StyledHeading,
  StyledModalCloseButton,
} from './Modal.style'

type Props = {
  children: ReactNode
  heading?: string
  onClose(): void
}

const Modal = ({ children, heading, onClose }: Props) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return (
    <StyledModalContainer onClick={onClose}>
      <StyledModal onClick={(e) => e.stopPropagation()}>
        {heading && <StyledHeading>{heading}</StyledHeading>}
        {children}
        <StyledModalCloseButton onClick={onClose} />
      </StyledModal>
    </StyledModalContainer>
  )
}

export { Modal }
