import { useEffect, ReactNode } from 'react'

import styles from './Modal.module.css'

type Props = {
  children: ReactNode
  heading?: string
  onClose(): void
}

function Modal({ children, heading, onClose }: Props) {
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
    <div
      className={styles.modalContainer}
      onClick={onClose}
    >
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        {heading && <h2 className={styles.heading}>{heading}</h2>}
        {children}
        <button
          className={styles.closeButton}
          onClick={onClose}
        />
      </div>
    </div>
  )
}

export { Modal }
