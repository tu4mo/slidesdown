import { Suspense } from 'react'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router'

import { Spinner } from './components/Spinner'

import { getPresentation } from './firebase'

import 'prismjs/themes/prism.css'
import './styles.css'
import SlidesEditor from './views/SlidesEditor'
import Presentation from './views/Presentation'

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
    loader: async ({ params }) => {
      return { slides: await getPresentation(params['presentationId']!) }
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
