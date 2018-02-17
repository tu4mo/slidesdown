import React from 'react'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter, Route } from 'react-router-dom'

import { injectGlobalStyles, StyledMain } from './styles.js'
import theme from './theme'
import SlidesEditor from './views/SlidesEditor'

injectGlobalStyles()

const App = () => (
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <StyledMain>
        <Route path="/:slidesId?" component={SlidesEditor} />
      </StyledMain>
    </BrowserRouter>
  </ThemeProvider>
)

export default App
