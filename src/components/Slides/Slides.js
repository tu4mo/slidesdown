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

class Slides extends Component {
  static propTypes = {
    isSingle: PropTypes.bool,
    markdown: PropTypes.string,
    theme: PropTypes.string
  }

  state = {
    height: 0,
    scale: 1,
    width: 0
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize)

    this.handleResize()
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

    if (!this.props.isSingle || maxHeight > maxWidth * RATIO) {
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

  render() {
    const { isSingle, markdown, theme } = this.props
    const { height, scale, width } = this.state

    const StyledTheme = THEMES[theme || 'default']

    const slides = markdown
      .split('---')
      .map(slideMarkdown => (
        <Slide
          height={height}
          key={slideMarkdown}
          markdown={slideMarkdown}
          scale={scale}
          width={width}
        />
      ))

    return isSingle ? (
      <StyledTheme>
        <StyledSingleSlideContainer innerRef={ref => (this.slidesRef = ref)}>
          {slides}
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
