import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { getCurrentLineNumber } from './utils'

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
    const { onSlideChange } = this.props

    const currentLineNumber = getCurrentLineNumber(
      this.editor.value,
      this.getCurrentCursorPosition()
    )

    const linesThatHaveSlideBreak = this.props.value
      .split('\n')
      .reduce(
        (prev, curr, index) => (curr === '---' ? [...prev, index + 1] : prev),
        [0]
      )
      .map((lines, index) => ({ slide: index, startFrom: lines }))

    onSlideChange &&
      onSlideChange(
        linesThatHaveSlideBreak
          .reverse()
          .find(slide => currentLineNumber > slide.startFrom).slide
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
        autoFocus
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
