import React, { Component } from 'react'
import PropTypes from 'prop-types'
import throttle from 'lodash.throttle'

import Slide from '../Slide'

import { StyledSingleSlideContainer, StyledSlidesContainer } from './styles'

class Slides extends Component {
  static propTypes = {
    isSingle: PropTypes.bool,
    markdown: PropTypes.string
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

    if (maxHeight > maxWidth * 0.5625) {
      height = maxWidth * 0.5625
    } else {
      width = maxHeight / 0.5625
    }

    this.setState({
      height,
      scale: Math.min(width / 800, height / 450),
      width
    })
  }, 100)

  render() {
    const { isSingle, markdown } = this.props
    const { height, scale, width } = this.state

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
      <StyledSingleSlideContainer innerRef={ref => (this.slidesRef = ref)}>
        {slides}
      </StyledSingleSlideContainer>
    ) : (
      <StyledSlidesContainer innerRef={ref => (this.slidesRef = ref)}>
        {slides}
      </StyledSlidesContainer>
    )
  }
}

export default Slides
