import React, { Component } from 'react'

import Editor from './components/Editor'
import Slides from './components/Slides'

import {
  injectGlobalStyles,
  StyledMain,
  StyledSidebar,
  StyledSlidesContainer
} from './styles.js'

injectGlobalStyles()

class App extends Component {
  state = {
    markdown:
      '# Welcome to *Slidesdown*\n\n---\n\n' +
      '✨ Write markdown, get slides! ✨\n\n---\n\n' +
      '## A list!\n\n- Awesome\n\n1. Yeah!'
  }

  handleEditorOnChange = e => {
    this.setState({ markdown: e.target.value })
  }

  render() {
    const { markdown } = this.state

    return (
      <StyledMain>
        <StyledSidebar>
          <Editor onChange={this.handleEditorOnChange} value={markdown} />
        </StyledSidebar>
        <StyledSlidesContainer>
          <Slides markdown={markdown} />
        </StyledSlidesContainer>
      </StyledMain>
    )
  }
}

export default App
