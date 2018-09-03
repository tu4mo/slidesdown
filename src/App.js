import React, { Fragment } from 'react'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { connect, Provider } from 'unistore/react'
import { hot } from 'react-hot-loader'
import uuid from 'uuid/v4'

import Loadable from './components/Loadable'

import { injectGlobalStyles } from './App.style'
import theme from './theme'
import { actions, store } from './store'

const ErrorDialog = Loadable(() => import('./components/ErrorDialog'))
const Presentation = Loadable(() => import('./views/Presentation'))
const SlidesEditor = Loadable(() => import('./views/SlidesEditor'))

injectGlobalStyles()

const App = connect(
  'error, editableId',
  actions
)(({ error, editableId, setError }) => (
  <ThemeProvider theme={theme}>
    <Fragment>
      <BrowserRouter>
        <Switch>
          <Route
            component={Presentation}
            path="/presentation/:slidesId?/:slideNumber?"
          />
          <Route component={SlidesEditor} path="/:slidesId" />
          <Redirect from="/" to={`/${uuid()}`} />
        </Switch>
      </BrowserRouter>
      {error && <ErrorDialog error={error} onClose={() => setError('')} />}
    </Fragment>
  </ThemeProvider>
))

const ProvidedApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

export default hot(module)(ProvidedApp)
