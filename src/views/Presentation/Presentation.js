import React, { useCallback, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import Fullscreen from 'react-full-screen'

import { getPresentation } from '../../firebase'

import Icon from '../../components/Icon'
import Key from '../../components/Key'
import Notification from '../../components/Notification'
import Slides from '../../components/Slides'
import Spinner from '../../components/Spinner'
import ToolBar from '../../components/ToolBar'

import {
  StyledPresentation,
  StyledNoticationContainer,
  StyledPresentationToolbar
} from './Presentation.style'

const Presentation = ({ history, match }) => {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isToolbarVisible, setIsToolbarVisible] = useState(false)
  const [markdown, setMarkdown] = useState('')
  const [theme, setTheme] = useState('')

  const slidesCount = useRef(0)
  const toolbarVisibilityTimer = useRef(null)

  const changeSlide = useCallback(
    (next = true) => {
      const slideNumber = match.params.slideNumber || 0
      const getSlideUrl = slideNumber =>
        `/${match.params.slidesId || '-'}/${slideNumber}`

      if (next) {
        if (slideNumber < slidesCount.current - 1) {
          history.push(getSlideUrl(parseInt(slideNumber, 10) + 1))
        }
      } else {
        if (slideNumber > 0) {
          history.push(getSlideUrl(parseInt(slideNumber, 10) - 1))
        }
      }
    },
    [history, match.params.slidesId, match.params.slideNumber]
  )

  useEffect(() => {
    const handleKeyUp = e => {
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
    const slidesId = match.params.slidesId

    const fetchPresentation = async () => {
      try {
        const slides = await getPresentation(slidesId)

        setIsLoading(false)
        setMarkdown(slides.markdown)
        setTheme(slides.theme)
      } catch (err) {
        history.push('/')
      }
    }

    if (slidesId && slidesId !== '-') {
      fetchPresentation()
    }
  }, [history, match.params.slidesId])

  const handleSlidesCount = count => (slidesCount.current = count)

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

  const handleToolbarMouseMove = e => {
    e.stopPropagation()
    clearTimeout(toolbarVisibilityTimer.current)
  }

  const { slideNumber: slideNumberAsString = '0' } = match.params
  const slideNumber = parseInt(slideNumberAsString, 10)

  return isLoading ? (
    <Spinner />
  ) : (
    <Fullscreen
      enabled={isFullscreen}
      onChange={isFullscreen => setIsFullscreen(isFullscreen)}
    >
      <StyledPresentation onMouseMove={handlePresentationMouseMove}>
        <Slides
          markdown={markdown}
          onSlidesCount={handleSlidesCount}
          singleSlide={slideNumber}
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
              disabled={slideNumber === 0}
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
              disabled={slideNumber >= slidesCount.current - 1}
              onClick={changeSlide}
              tooltip={
                <>
                  Next <Key>→</Key> / <Key>space</Key>
                </>
              }
              type="right"
            />
          </ToolBar>
        </StyledPresentationToolbar>
      </StyledPresentation>
    </Fullscreen>
  )
}

Presentation.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
}

export default Presentation
