import { Suspense, lazy } from 'react'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router'

import { Spinner } from './components/Spinner'

import { getPresentation } from './firebase'

import 'prismjs/themes/prism.css'
import './styles.css'

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
      return { slides: getPresentation(params['presentationId']!) }
    },
    errorElement: <Navigate to="/" />,
  },
])

export function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <RouterProvider router={router} />
    </Suspense>
  )
}
