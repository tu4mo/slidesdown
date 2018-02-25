import React from 'react'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'unistore/react'

import Loadable from './components/Loadable'

import { injectGlobalStyles } from './styles.js'
import theme from './theme'
import { store } from './store'

const Presentation = Loadable(() => import('./views/Presentation'))
const SlidesEditor = Loadable(() => import('./views/SlidesEditor'))

injectGlobalStyles()

const App = () => (
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Switch>
        <Route
          component={Presentation}
          path="/presentation/:slidesId?/:slideNumber?"
        />
        <Route component={SlidesEditor} path="/:slidesId?" />
      </Switch>
    </BrowserRouter>
  </ThemeProvider>
)

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
)
