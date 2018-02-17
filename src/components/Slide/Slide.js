import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Markdown from 'react-markdown'

import { StyledSlideContainer, StyledSlide } from './styles'

class Slide extends Component {
  static propTypes = {
    markdown: PropTypes.string
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.markdown !== this.props.markdown
  }

  render() {
    const { markdown } = this.props

    return (
      <StyledSlideContainer>
        <StyledSlide>
          <Markdown source={markdown} />
        </StyledSlide>
      </StyledSlideContainer>
    )
  }
}

export default Slide
