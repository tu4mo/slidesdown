import { Logo } from '../../components/Logo'
import { Modal } from '../../components/Modal'

import styles from './About.module.css'

type Props = {
  onClose(): void
}

function About({ onClose }: Props) {
  return (
    <Modal onClose={onClose}>
      <div className={styles.about}>
        <Logo large />
        <h2 className={styles.heading}>Write&nbsp;markdown, get&nbsp;slides</h2>
        <a
          href="https://github.com/tu4mo/slidesdown"
          rel="noopener noreferrer"
          target="_blank"
        >
          GitHub
        </a>
      </div>
    </Modal>
  )
}

export { About }
