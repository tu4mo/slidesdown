import { Suspense, lazy } from 'react'
import {
  createBrowserRouter,
  defer,
  Navigate,
  RouterProvider,
} from 'react-router-dom'

import { GlobalStyle } from './App.style'
import { Spinner } from './components/Spinner'

import { getPresentation } from './firebase'

import 'prismjs/themes/prism.css'

const Presentation = lazy(() => import('./views/Presentation'))
const SlidesEditor = lazy(() => import('./views/SlidesEditor'))

const newFilePath = `/edit/${crypto.randomUUID()}`

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to={newFilePath} />,
  },
  {
    path: '/edit/:slidesId',
    element: <SlidesEditor />,
  },
  {
    path: '/:presentationId',
    element: <Presentation />,
    loader: ({ params }) => {
      return defer({ slides: getPresentation(params['presentationId']!) })
    },
    errorElement: <Navigate to="/" />,
  },
])

const App = () => (
  <>
    <GlobalStyle />
    <Suspense fallback={<Spinner />}>
      <RouterProvider router={router} />
    </Suspense>
  </>
)

export default App
