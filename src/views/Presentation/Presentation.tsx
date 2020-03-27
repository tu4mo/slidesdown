import React, { useCallback, useEffect, useRef, useState } from 'react'
import Fullscreen from 'react-full-screen'
import { RouteChildrenProps } from 'react-router'
import { useParams } from 'react-router-dom'

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

const Presentation = ({
  history,
  location,
}: RouteChildrenProps<{ slideNumber: string; slidesId: string }>) => {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isToolbarVisible, setIsToolbarVisible] = useState(false)
  const [markdown, setMarkdown] = useState('')
  const [theme, setTheme] = useState('')

  const slidesId = useRef(null)
  const slidesCount = useRef(0)
  const toolbarVisibilityTimer = useRef(0)

  const { slideNumber = '0', presentationId = '-' } = useParams()
  const slideNumberAsNumber = parseInt(slideNumber)

  const changeSlide = useCallback(
    (next = true) => {
      const getSlideUrl = (slideNumber: number) =>
        `/${presentationId || '-'}/${slideNumber}`

      if (next) {
        if (slideNumberAsNumber < slidesCount.current - 1) {
          history.push(getSlideUrl(slideNumberAsNumber + 1))
        }
      } else {
        if (slideNumberAsNumber > 0) {
          history.push(getSlideUrl(slideNumberAsNumber - 1))
        }
      }
    },
    [history, presentationId, slideNumberAsNumber]
  )

  useEffect(() => {
    if (!slidesId.current) {
      slidesId.current =
        (location && location.state && location.state.slidesId) || null
    }
  }, [location])

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
      clearTimeout(toolbarVisibilityTimer.current)
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
        history.push('/')
      }
    }

    if (presentationId && presentationId !== '-') {
      fetchPresentation()
    }
  }, [history, presentationId])

  const handleSlidesCount = (count: number) => (slidesCount.current = count)

  const handlePresentationMouseMove = () => {
    if (!isToolbarVisible) {
      setIsToolbarVisible(true)
    }

    clearTimeout(toolbarVisibilityTimer.current)

    toolbarVisibilityTimer.current = setTimeout(
      () => setIsToolbarVisible(false),
      2000
    )
  }

  const handleToolbarMouseMove = (e: React.MouseEvent) => {
    e.stopPropagation()
    clearTimeout(toolbarVisibilityTimer.current)
  }

  return isLoading ? (
    <Spinner />
  ) : (
    <Fullscreen
      enabled={isFullscreen}
      onChange={(isFullscreen) => setIsFullscreen(isFullscreen)}
    >
      <StyledPresentation onMouseMove={handlePresentationMouseMove}>
        <Slides
          markdown={markdown}
          onSlidesCount={handleSlidesCount}
          singleSlide={slideNumberAsNumber}
          theme={theme}
        />
        <StyledNoticationContainer>
          <Notification slideDown timeout={5000}>
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
            {isFullscreen ? (
              <Icon
                onClick={() => setIsFullscreen(false)}
                tooltip={<span>Minimize</span>}
                type="minimize"
              />
            ) : (
              <Icon
                onClick={() => setIsFullscreen(true)}
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
            {slidesId.current && (
              <>
                <ToolBarDivider />
                <Icon
                  onClick={() => history.push(`/edit/${slidesId.current}`)}
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
            )}
          </ToolBar>
        </StyledPresentationToolbar>
      </StyledPresentation>
    </Fullscreen>
  )
}

export default Presentation
