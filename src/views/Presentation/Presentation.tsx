import { useCallback, useEffect, useRef, useState } from 'react'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import { useParams, useNavigate, useLocation } from 'react-router-dom'

import { getPresentation } from '../../firebase'

import Icon from '../../components/Icon'
import Key from '../../components/Key'
import Notification from '../../components/Notification'
import Slides from '../../components/Slides'
import Spinner from '../../components/Spinner'
import ToolBar, { ToolBarDivider } from '../../components/ToolBar'

import {
  StyledPresentation,
  StyledNoticationContainer,
  StyledPresentationToolbar,
} from './Presentation.style'

const Presentation = () => {
  const fullscreen = useFullScreenHandle()
  const [isLoading, setIsLoading] = useState(true)
  const [isToolbarVisible, setIsToolbarVisible] = useState(false)
  const [markdown, setMarkdown] = useState('')
  const [theme, setTheme] = useState('')

  const slidesCount = useRef(0)
  const toolbarVisibilityTimer = useRef<NodeJS.Timeout | null>(null)

  const navigate = useNavigate()
  const { state } = useLocation()
  const { slideNumber = '0', presentationId = '-' } = useParams<any>()

  const slideNumberAsNumber = parseInt(slideNumber)

  const changeSlide = useCallback(
    (next = true) => {
      const getSlideUrl = (slideNumber: number) =>
        `/${presentationId}/${slideNumber}`

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
    [state, navigate, presentationId, slideNumberAsNumber]
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

  useEffect(() => {
    const fetchPresentation = async () => {
      try {
        const slides = await getPresentation(presentationId)

        setIsLoading(false)
        setMarkdown(slides.markdown)
        setTheme(slides.theme)
      } catch (err) {
        navigate('/')
      }
    }

    if (presentationId && presentationId !== '-') {
      fetchPresentation()
    }
  }, [navigate, presentationId])

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
      2000
    )
  }

  const handleToolbarMouseMove = (e: React.MouseEvent) => {
    e.stopPropagation()

    if (toolbarVisibilityTimer.current) {
      clearTimeout(toolbarVisibilityTimer.current)
    }
  }

  return isLoading ? (
    <Spinner />
  ) : (
    <FullScreen handle={fullscreen}>
      <StyledPresentation onMouseMove={handlePresentationMouseMove}>
        <Slides
          markdown={markdown}
          onSlidesCount={handleSlidesCount}
          singleSlide={slideNumberAsNumber}
          theme={theme}
        />
        <StyledNoticationContainer>
          <Notification
            slideDown
            timeout={5000}
          >
            Press space or arrows to change slide.
          </Notification>
        </StyledNoticationContainer>
        <StyledPresentationToolbar
          onMouseMove={handleToolbarMouseMove}
          visible={isToolbarVisible}
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
            {state ? (
              <>
                <ToolBarDivider />
                <Icon
                  onClick={() => navigate(`/edit/${(state as any).slidesId}`)}
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
        </StyledPresentationToolbar>
      </StyledPresentation>
    </FullScreen>
  )
}

export default Presentation
