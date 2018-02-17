import React, { Component } from 'react'
import Markdown from 'react-markdown'

import { StyledSlides, StyledSlideContainer, StyledSlide } from './styles'

class Slides extends Component {
  state = {
    fontSize: 100
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize)

    this.handleResize()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  handleResize = e => {
    this.setState({
      fontSize: this.slidesRef.clientWidth * 0.2
    })
  }

  render() {
    const { markdown } = this.props
    const { fontSize } = this.state

    return (
      <StyledSlides
        fontSize={fontSize}
        innerRef={ref => (this.slidesRef = ref)}
      >
        {markdown.split('---').map(slide => (
          <StyledSlideContainer key={slide}>
            <StyledSlide>
              <Markdown source={slide} />
            </StyledSlide>
          </StyledSlideContainer>
        ))}
      </StyledSlides>
    )
  }
}

export default Slides
