import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { getCurrentLineNumber, getSlidesFirstLines } from './utils'

const StyledTextarea = styled.textarea`
  border: 0;
  color: ${props => props.theme.colors.lightText};
  font-family: ${props => props.theme.fonts.monospace};
  font-size: 16px;
  height: 100%;
  left: 0;
  outline: none;
  padding: 1rem;
  position: absolute;
  top: 0;
  resize: none;
  width: 100%;
  -webkit-overflow-scrolling: touch;
`

class Editor extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    onCursorPositionChange: PropTypes.func,
    onSlideChange: PropTypes.func,
    value: PropTypes.string
  }

  getCurrentCursorPosition = () => this.editor.selectionStart

  getCurrentSlide = e => {
    const { onSlideChange, value } = this.props

    const currentLineNumber = getCurrentLineNumber(
      this.editor.value,
      this.getCurrentCursorPosition()
    )

    const slides = getSlidesFirstLines(value)

    onSlideChange &&
      onSlideChange(
        slides.reverse().find(slide => currentLineNumber > slide.firstLine)
          .slide
      )
  }

  handleCursorPositionChange = e => {
    const { onCursorPositionChange } = this.props

    onCursorPositionChange &&
      onCursorPositionChange(this.getCurrentCursorPosition())
  }

  render() {
    const { onChange, value } = this.props

    return (
      <StyledTextarea
        innerRef={ref => (this.editor = ref)}
        onChange={onChange}
        onClick={this.getCurrentSlide}
        onKeyUp={this.getCurrentSlide}
        placeholder="Write markdown here"
        value={value}
      />
    )
  }
}

export default Editor
