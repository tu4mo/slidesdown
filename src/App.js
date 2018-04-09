import React, { Fragment } from 'react'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { connect, Provider } from 'unistore/react'
import { hot } from 'react-hot-loader'

import ErrorDialog from './components/ErrorDialog'
import Loadable from './components/Loadable'
import Modal from './components/Modal'

import { injectGlobalStyles } from './App.style'
import theme from './theme'
import { actions, store } from './store'

const Presentation = Loadable(() => import('./views/Presentation'))
const SlidesEditor = Loadable(() => import('./views/SlidesEditor'))

injectGlobalStyles()

const App = connect('error', actions)(({ error, setError }) => (
  <ThemeProvider theme={theme}>
    <Fragment>
      <BrowserRouter>
        <Switch>
          <Route
            component={Presentation}
            path="/presentation/:slidesId?/:slideNumber?"
          />
          <Route component={SlidesEditor} path="/:slidesId?" />
        </Switch>
      </BrowserRouter>
      {error && (
        <Modal heading="Error" onClose={() => setError('')}>
          <ErrorDialog error={error} />
        </Modal>
      )}
    </Fragment>
  </ThemeProvider>
))

const ProvidedApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

export default hot(module)(ProvidedApp)
