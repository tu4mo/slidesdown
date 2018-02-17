import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Slide from '../Slide'

import { StyledSlides } from './styles'

class Slides extends Component {
  static propTypes = {
    markdown: PropTypes.string
  }

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
        {markdown
          .split('---')
          .map(slideMarkdown => (
            <Slide key={slideMarkdown} markdown={slideMarkdown} />
          ))}
      </StyledSlides>
    )
  }
}

export default Slides
