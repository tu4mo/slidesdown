import React, { Fragment } from 'react'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { hot } from 'react-hot-loader'
import uuid from 'uuid/v4'

import Loadable from './components/Loadable'

import { GlobalStyle } from './App.style'
import theme from './theme'

const Presentation = Loadable(() => import('./views/Presentation'))
const SlidesEditor = Loadable(() => import('./views/SlidesEditor'))

const App = () => (
  <ThemeProvider theme={theme}>
    <Fragment>
      <BrowserRouter>
        <Switch>
          <Redirect exact from="/" to={`/edit/${uuid()}`} />
          <Route component={SlidesEditor} path="/edit/:slidesId" />
          <Route component={Presentation} path="/:slidesId?/:slideNumber?" />
        </Switch>
      </BrowserRouter>
      <GlobalStyle />
    </Fragment>
  </ThemeProvider>
)

export default hot(module)(App)
