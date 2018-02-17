import React, { Component } from 'react'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter, Route } from 'react-router-dom'

import { injectGlobalStyles, StyledMain } from './styles.js'
import theme from './theme'
import SlidesEditor from './views/SlidesEditor'

injectGlobalStyles()

class App extends Component {
  state = {
    markdown:
      '# Welcome to *Slidesdown*\n\n---\n\n' +
      '✨ Write markdown, get slides! ✨\n\n---\n\n' +
      '## A list!\n\n- Awesome\n\n1. Yeah!'
  }

  handleEditorChange = markdown => {
    this.setState({ markdown })
  }

  render() {
    const { markdown } = this.state

    return (
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <StyledMain>
            <Route
              path="/:slidesId?"
              render={props => (
                <SlidesEditor
                  {...props}
                  markdown={markdown}
                  onEditorChange={this.handleEditorChange}
                />
              )}
            />
          </StyledMain>
        </BrowserRouter>
      </ThemeProvider>
    )
  }
}

export default App
