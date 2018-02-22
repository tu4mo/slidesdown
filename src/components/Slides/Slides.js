import React, { Component } from 'react'
import PropTypes from 'prop-types'
import throttle from 'lodash.throttle'

import Slide from '../Slide'

import { StyledSingleSlideContainer, StyledSlidesContainer } from './styles'

import defaultTheme from './themes/default'
import goforeTheme from './themes/gofore'

const THEMES = {
  default: defaultTheme,
  gofore: goforeTheme
}

const splitMarkdownToSlides = markdown => markdown.split('\n---\n')

class Slides extends Component {
  static propTypes = {
    markdown: PropTypes.string,
    onSlidesCount: PropTypes.func,
    singleSlide: PropTypes.number,
    theme: PropTypes.string
  }

  state = {
    height: 0,
    scale: 1,
    width: 0
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize)

    this.handleSlidesCount()
    this.handleResize()
  }

  componentDidUpdate() {
    this.handleSlidesCount()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  handleResize = throttle(() => {
    const computedStyle = window.getComputedStyle(this.slidesRef)

    const maxWidth =
      this.slidesRef.clientWidth -
      parseInt(computedStyle.paddingLeft, 10) -
      parseInt(computedStyle.paddingRight, 10)

    const maxHeight =
      this.slidesRef.clientHeight -
      parseInt(computedStyle.paddingBottom, 10) -
      parseInt(computedStyle.paddingTop, 10)

    let width = maxWidth
    let height = maxHeight

    const RATIO = 0.5625

    if (this.props.singleSlide === undefined || maxHeight > maxWidth * RATIO) {
      height = maxWidth * RATIO
    } else {
      width = maxHeight / RATIO
    }

    this.setState({
      height,
      scale: Math.min(width / 800, height / 450),
      width
    })
  }, 100)

  handleSlidesCount = () => {
    const { markdown, onSlidesCount } = this.props
    onSlidesCount && onSlidesCount(splitMarkdownToSlides(markdown).length)
  }

  render() {
    const { singleSlide, markdown, theme } = this.props
    const { height, scale, width } = this.state

    const StyledTheme = THEMES[theme || 'default']

    const slides = splitMarkdownToSlides(markdown).map(slideMarkdown => (
      <Slide
        height={height}
        key={slideMarkdown}
        markdown={slideMarkdown}
        scale={scale}
        width={width}
      />
    ))

    return singleSlide !== undefined ? (
      <StyledTheme>
        <StyledSingleSlideContainer innerRef={ref => (this.slidesRef = ref)}>
          {slides[singleSlide]}
        </StyledSingleSlideContainer>
      </StyledTheme>
    ) : (
      <StyledTheme>
        <StyledSlidesContainer innerRef={ref => (this.slidesRef = ref)}>
          {slides}
        </StyledSlidesContainer>
      </StyledTheme>
    )
  }
}

export default Slides
