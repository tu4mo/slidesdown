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
    onDrop: PropTypes.func,
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
    const { onChange, value } = this.props

    return (
      <StyledTextarea
        innerRef={ref => (this.editor = ref)}
        onChange={onChange}
        onClick={this.getCurrentSlide}
        onDrop={this.handleDrop}
        onKeyUp={this.getCurrentSlide}
        placeholder="Write markdown here"
        value={value}
      />
    )
  }
}

export default Editor
