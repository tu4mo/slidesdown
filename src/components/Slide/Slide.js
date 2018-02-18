import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Markdown from 'react-markdown'

import {
  StyledTransformContainer,
  StyledSlideContainer,
  StyledSlide
} from './styles'

class Slide extends Component {
  static propTypes = {
    height: PropTypes.number.isRequired,
    scale: PropTypes.number.isRequired,
    markdown: PropTypes.string,
    width: PropTypes.number.isRequired
  }

  shouldComponentUpdate(nextProps) {
    return (
      nextProps.height !== this.props.height ||
      nextProps.markdown !== this.props.markdown ||
      nextProps.scale !== this.props.scale ||
      nextProps.width !== this.props.width
    )
  }

  render() {
    const { markdown, scale, width, height } = this.props

    return (
      <StyledTransformContainer width={width} height={height}>
        <StyledSlideContainer scale={scale}>
          <StyledSlide>
            <Markdown source={markdown} />
          </StyledSlide>
        </StyledSlideContainer>
      </StyledTransformContainer>
    )
  }
}

export default Slide
