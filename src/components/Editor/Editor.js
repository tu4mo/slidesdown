import React, { Component, createRef } from 'react'
import PropTypes from 'prop-types'

import {
  StyledWrapper,
  StyledTextarea,
  StyledProgressBar
} from './Editor.style'

import {
  getCurrentLineNumber,
  getSlidesFirstLines,
  getCurrentSlide
} from './utils'

class Editor extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    onCursorPositionChange: PropTypes.func,
    onDrop: PropTypes.func,
    progress: PropTypes.number,
    value: PropTypes.string
  }

  editorRef = createRef()

  getCurrentCursorPosition = () => this.editorRef.current.selectionStart

  handleClickAndKeyUp = () => {
    const { onCursorPositionChange, value } = this.props

    const cursorPosition = this.getCurrentCursorPosition()

    const currentLineNumber = getCurrentLineNumber(value, cursorPosition)

    const slides = getSlidesFirstLines(value)
    const slide = getCurrentSlide(slides, currentLineNumber)

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
          aria-label="Markdown"
          disabled={isLoading}
          onChange={onChange}
          onClick={this.handleClickAndKeyUp}
          onDrop={this.handleDrop}
          onKeyUp={this.handleClickAndKeyUp}
          placeholder="Write markdown here"
          ref={this.editorRef}
          value={value}
        />
        {isLoading && <StyledProgressBar progress={progress} />}
      </StyledWrapper>
    )
  }
}

export default Editor
