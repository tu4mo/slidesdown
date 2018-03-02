import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Markdown from 'react-markdown'

import {
  StyledTransformContainer,
  StyledSlideContainer,
  StyledSlide
} from './styles'

import CodeBlock from './CodeBlock'

class Slide extends PureComponent {
  static propTypes = {
    height: PropTypes.number.isRequired,
    scale: PropTypes.number.isRequired,
    markdown: PropTypes.string,
    width: PropTypes.number.isRequired
  }

  render() {
    const { markdown, scale, width, height } = this.props

    return (
      <StyledTransformContainer style={{ height: height, width: width }}>
        <StyledSlideContainer
          style={{ transform: `translate(-50%, -50%) scale(${scale})` }}
        >
          <StyledSlide className="slide">
            <Markdown renderers={{ code: CodeBlock }} source={markdown} />
          </StyledSlide>
        </StyledSlideContainer>
      </StyledTransformContainer>
    )
  }
}

export default Slide
