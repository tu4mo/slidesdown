import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import Slide from '../Slide'
import WindowResizeObserver from '../WindowResizeObserver'

import {
  StyledSingleSlideContainer,
  StyledSlidesContainer
} from './Slides.style'

import defaultTheme from './themes/default'
import goforeTheme from './themes/gofore'

const THEMES = {
  default: defaultTheme,
  gofore: goforeTheme
}

const splitMarkdownToSlides = markdown => markdown.split('\n---\n')

const Slides = ({
  markdown,
  onSlidesCount,
  singleSlide,
  slideToFocus,
  theme
}) => {
  const [height, setHeight] = useState(0)
  const [scale, setScale] = useState(1)
  const [width, setWidth] = useState(0)

  const slidesRef = useRef(null)
  const scrollToRef = useRef(null)

  useEffect(() => {
    const handleSlidesCount = () => {
      onSlidesCount && onSlidesCount(splitMarkdownToSlides(markdown).length)
    }

    handleSlidesCount()
    scrollToSlide()
  }, [markdown, onSlidesCount, slideToFocus])

  const scrollToSlide = () => {
    if (scrollToRef.current) {
      slidesRef.current.scrollTop = scrollToRef.current.offsetTop - 32
    }
  }

  const handleResize = () => {
    const computedStyle = window.getComputedStyle(slidesRef.current)

    const maxWidth =
      slidesRef.current.clientWidth -
      parseInt(computedStyle.paddingLeft, 10) -
      parseInt(computedStyle.paddingRight, 10)

    const maxHeight =
      slidesRef.current.clientHeight -
      parseInt(computedStyle.paddingBottom, 10) -
      parseInt(computedStyle.paddingTop, 10)

    let width = maxWidth
    let height = maxHeight

    const RATIO = 0.5625

    if (singleSlide === undefined || maxHeight > maxWidth * RATIO) {
      height = maxWidth * RATIO
    } else {
      width = maxHeight / RATIO
    }

    setHeight(height)
    setScale(Math.min(width / 800, height / 450))
    setWidth(width)
  }

  const StyledTheme = THEMES[theme || 'default']

  const slides = splitMarkdownToSlides(markdown).map(
    (slideMarkdown, slideIndex) => (
      <Slide
        height={height}
        key={slideMarkdown}
        markdown={slideMarkdown}
        ref={slideIndex === slideToFocus ? scrollToRef : null}
        scale={scale}
        single={singleSlide !== undefined}
        width={width}
      />
    )
  )

  return (
    <StyledTheme>
      {singleSlide !== undefined ? (
        <StyledSingleSlideContainer ref={slidesRef}>
          {slides[singleSlide]}
        </StyledSingleSlideContainer>
      ) : (
        <StyledSlidesContainer ref={slidesRef}>{slides}</StyledSlidesContainer>
      )}
      <WindowResizeObserver onResize={handleResize} />
    </StyledTheme>
  )
}

Slides.propTypes = {
  markdown: PropTypes.string,
  onSlidesCount: PropTypes.func,
  singleSlide: PropTypes.number,
  slideToFocus: PropTypes.number,
  theme: PropTypes.string
}

export default Slides
