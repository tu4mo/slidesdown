import { useState } from 'react'

import { Icon } from '../../components/Icon'
import { Logo } from '../../components/Logo'
import { ToolBar } from '../../components/ToolBar'
import { Tooltip } from '../../components/Tooltip'

import styles from './SlidesToolBar.module.css'

import { About } from './About'

type Props = {
  isSaving: boolean
  onPresentationClick(): void
}

function SlidesToolBar({ isSaving, onPresentationClick }: Props) {
  const [isAboutVisible, setIsAboutVisible] = useState(false)

  return (
    <>
      <div className={styles.toolBarContainer}>
        <ToolBar>
          <div className={styles.logoContainer}>
            <Tooltip content="About Slidesdown">
              <Logo onClick={() => setIsAboutVisible(true)} />
            </Tooltip>
          </div>
          <div
            className={
              isSaving
                ? `${styles.iconWrapper} ${styles.iconWrapperWithNotification}`
                : styles.iconWrapper
            }
          >
            <Icon
              alt="Presentation"
              onClick={onPresentationClick}
              tooltip="Presentation"
              type="presentation"
            />
          </div>
        </ToolBar>
      </div>
      {isAboutVisible && <About onClose={() => setIsAboutVisible(false)} />}
    </>
  )
}

export { SlidesToolBar }
