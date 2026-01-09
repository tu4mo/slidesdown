import { useCallback, useEffect, useRef, useState } from 'react'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import {
  useParams,
  useNavigate,
  useLocation,
  useLoaderData,
} from 'react-router'

import { Icon } from '../../components/Icon'
import { Key } from '../../components/Key'
import { Notification } from '../../components/Notification'
import { Slides } from '../../components/Slides'
import { ToolBar, ToolBarDivider } from '../../components/ToolBar'

import styles from './Presentation.module.css'

function Presentation() {
  const fullscreen = useFullScreenHandle()
  const [isToolbarVisible, setIsToolbarVisible] = useState(false)
  const { slides } = useLoaderData<{
    slides: { markdown: string }
  }>()

  const slidesCount = useRef(0)
  const toolbarVisibilityTimer = useRef<number | null>(null)

  const navigate = useNavigate()
  const { state, hash } = useLocation()
  const slideNumberAsNumber = parseInt(hash.replace('#', '')) || 0
  const { presentationId = '-' } = useParams()

  const changeSlide = useCallback(
    (next = true) => {
      const getSlideUrl = (slideNumber: number) =>
        `/${presentationId}#${slideNumber}`

      if (next) {
        if (slideNumberAsNumber < slidesCount.current - 1) {
          navigate(getSlideUrl(slideNumberAsNumber + 1), { state })
        }
      } else {
        if (slideNumberAsNumber > 0) {
          navigate(getSlideUrl(slideNumberAsNumber - 1), { state })
        }
      }
    },
    [state, navigate, presentationId, slideNumberAsNumber],
  )

  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'ArrowLeft':
          changeSlide(false)
          break
        case 'ArrowRight':
        case 'Space':
          changeSlide()
          break
        default:
          break
      }
    }

    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keyup', handleKeyUp)

      if (toolbarVisibilityTimer.current) {
        clearTimeout(toolbarVisibilityTimer.current)
      }
    }
  }, [changeSlide])

  const handleSlidesCount = (count: number) => (slidesCount.current = count)

  const handlePresentationMouseMove = () => {
    if (!isToolbarVisible) {
      setIsToolbarVisible(true)
    }

    if (toolbarVisibilityTimer.current) {
      clearTimeout(toolbarVisibilityTimer.current)
    }

    toolbarVisibilityTimer.current = setTimeout(
      () => setIsToolbarVisible(false),
      2000,
    )
  }

  const handleToolbarMouseMove = (e: React.MouseEvent) => {
    e.stopPropagation()

    if (toolbarVisibilityTimer.current) {
      clearTimeout(toolbarVisibilityTimer.current)
    }
  }

  return (
    <FullScreen handle={fullscreen}>
      <div
        className={styles.presentation}
        onMouseMove={handlePresentationMouseMove}
      >
        <Slides
          markdown={slides.markdown}
          onSlidesCount={handleSlidesCount}
          singleSlide={slideNumberAsNumber}
        />
        <div className={styles.notificationContainer}>
          <Notification
            slideDown
            timeout={5000}
          >
            Press space or arrows to change slide.
          </Notification>
        </div>
        <div
          className={
            styles.presentationToolbar +
            (!isToolbarVisible ? ' ' + styles.presentationToolbarHidden : '')
          }
          onMouseMove={handleToolbarMouseMove}
        >
          <ToolBar>
            <Icon
              disabled={slideNumberAsNumber === 0}
              onClick={() => changeSlide(false)}
              tooltip={
                <>
                  Previous <Key>←</Key>
                </>
              }
              type="left"
            />
            {fullscreen.active ? (
              <Icon
                onClick={fullscreen.exit}
                tooltip={<span>Minimize</span>}
                type="minimize"
              />
            ) : (
              <Icon
                onClick={fullscreen.enter}
                tooltip={<span>Maximize</span>}
                type="maximize"
              />
            )}
            <Icon
              disabled={slideNumberAsNumber >= slidesCount.current - 1}
              onClick={changeSlide}
              tooltip={
                <>
                  Next <Key>→</Key> / <Key>space</Key>
                </>
              }
              type="right"
            />
            {state?.slidesId ? (
              <>
                <ToolBarDivider />
                <Icon
                  onClick={() => navigate(`/edit/${state.slidesId}`)}
                  tooltip={
                    <>
                      Edit
                      <br />
                      (available when coming from editor)
                    </>
                  }
                  type="edit"
                />
              </>
            ) : undefined}
          </ToolBar>
        </div>
      </div>
    </FullScreen>
  )
}

export default Presentation
