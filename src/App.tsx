import { Fragment, Suspense, lazy } from 'react'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

import { GlobalStyle } from './App.style'
import theme from './theme'
import Spinner from './components/Spinner'

import 'prismjs/themes/prism.css'

const Presentation = lazy(() => import('./views/Presentation'))
const SlidesEditor = lazy(() => import('./views/SlidesEditor'))

const newFilePath = `/edit/${uuid()}`

const App = () => (
  <ThemeProvider theme={theme}>
    <Fragment>
      <BrowserRouter>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="/" element={<Navigate to={newFilePath} />} />
            <Route path="/edit/:slidesId" element={<SlidesEditor />} />
            <Route path="/:presentationId" element={<Presentation />} />
            <Route
              path="/:presentationId/:slideNumber"
              element={<Presentation />}
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
      <GlobalStyle />
    </Fragment>
  </ThemeProvider>
)

export default App
