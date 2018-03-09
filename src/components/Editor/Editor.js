import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { StyledWrapper, StyledTextarea, StyledProgressBar } from './styles'
import { getCurrentLineNumber, getSlidesFirstLines } from './utils'

class Editor extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    onCursorPositionChange: PropTypes.func,
    onDrop: PropTypes.func,
    progress: PropTypes.number,
    value: PropTypes.string
  }

  getCurrentCursorPosition = () => this.editor.selectionStart

  getCurrentSlide = () => {
    const { onCursorPositionChange, value } = this.props

    const cursorPosition = this.getCurrentCursorPosition()

    const currentLineNumber = getCurrentLineNumber(
      this.editor.value,
      cursorPosition
    )

    const slides = getSlidesFirstLines(value)
    const slide = slides
      .reverse()
      .find(slide => currentLineNumber > slide.firstLine).slide

    onCursorPositionChange &&
      onCursorPositionChange({
        cursorPosition,
        slide
      })
  }

  handleCursorPositionChange = () => {
    const { onCursorPositionChange } = this.props

    onCursorPositionChange &&
      onCursorPositionChange(this.getCurrentCursorPosition())
  }

  handleDrop = event => {
    const { onDrop } = this.props

    event.preventDefault()
    onDrop && onDrop(event.dataTransfer.files[0])
  }

  render() {
    const { isLoading, onChange, progress, value } = this.props

    return (
      <StyledWrapper>
        <StyledTextarea
          disabled={isLoading}
          innerRef={ref => (this.editor = ref)}
          onChange={onChange}
          onClick={this.getCurrentSlide}
          onDrop={this.handleDrop}
          onKeyUp={this.getCurrentSlide}
          placeholder="Write markdown here"
          value={value}
        />
        {isLoading && <StyledProgressBar progress={progress} />}
      </StyledWrapper>
    )
  }
}

export default Editor
