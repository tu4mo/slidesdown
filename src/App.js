import React, { Fragment, Suspense, lazy } from 'react'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { hot, setConfig } from 'react-hot-loader'
import uuid from 'uuid/v4'
import validate from 'uuid-validate'

import { GlobalStyle } from './App.style'
import theme from './theme'
import Spinner from './components/Spinner'

const Presentation = lazy(() => import('./views/Presentation'))
const SlidesEditor = lazy(() => import('./views/SlidesEditor'))

const editPath = `/edit/${uuid()}`

setConfig({
  ignoreSFC: true
})

const App = () => (
  <ThemeProvider theme={theme}>
    <Fragment>
      <BrowserRouter>
        <Suspense fallback={<Spinner />}>
          <Switch>
            <Redirect exact from="/" to={editPath} />
            <Route
              path="/edit/:slidesId?"
              render={props => {
                return validate(props.match.params.slidesId) ? (
                  <SlidesEditor {...props} />
                ) : (
                  <Redirect to={editPath} />
                )
              }}
            />
            <Route component={Presentation} path="/:slidesId?/:slideNumber?" />
          </Switch>
        </Suspense>
      </BrowserRouter>
      <GlobalStyle />
    </Fragment>
  </ThemeProvider>
)

export default hot(module)(App)
