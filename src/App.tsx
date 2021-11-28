import { Fragment, Suspense, lazy } from 'react'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { v4 as uuid, validate } from 'uuid'

import { GlobalStyle } from './App.style'
import theme from './theme'
import Spinner from './components/Spinner'

import 'prismjs/themes/prism.css'

const Presentation = lazy(() => import('./views/Presentation'))
const SlidesEditor = lazy(() => import('./views/SlidesEditor'))

const editPath = `/edit/${uuid()}`

const App = () => (
  <ThemeProvider theme={theme}>
    <Fragment>
      <BrowserRouter>
        <Suspense fallback={<Spinner />}>
          <Switch>
            <Route exact path="/" render={() => <Redirect to={editPath} />} />
            <Route
              path="/edit/:slidesId?"
              render={(props) =>
                validate(props.match.params.slidesId || '') ? (
                  <SlidesEditor />
                ) : (
                  <Redirect to={editPath} />
                )
              }
            />
            <Route path="/:presentationId?/:slideNumber?">
              <Presentation />
            </Route>
          </Switch>
        </Suspense>
      </BrowserRouter>
      <GlobalStyle />
    </Fragment>
  </ThemeProvider>
)

export default App
