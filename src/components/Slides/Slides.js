import React, { Component } from 'react'
import PropTypes from 'prop-types'
import throttle from 'lodash.throttle'

import Slide from '../Slide'

import { StyledSlides } from './styles'

class Slides extends Component {
  static propTypes = {
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

    const width =
      this.slidesRef.clientWidth -
      parseInt(computedStyle.paddingLeft, 10) -
      parseInt(computedStyle.paddingRight, 10)

    const height = width / 16 * 9

    this.setState({
      height,
      scale: Math.min(width / 800, height / 450),
      width
    })
  }, 100)

  render() {
    const { markdown } = this.props
    const { height, scale, width } = this.state

    return (
      <StyledSlides innerRef={ref => (this.slidesRef = ref)}>
        {markdown
          .split('---')
          .map(slideMarkdown => (
            <Slide
              height={height}
              key={slideMarkdown}
              markdown={slideMarkdown}
              scale={scale}
              width={width}
            />
          ))}
      </StyledSlides>
    )
  }
}

export default Slides
