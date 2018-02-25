import React from 'react'
import Loadable from 'react-loadable'

import Spinner from '../Spinner'

const Loading = () => <Spinner />

const LoadableComponent = loader =>
  Loadable({
    loader,
    loading: Loading
  })

export default LoadableComponent
