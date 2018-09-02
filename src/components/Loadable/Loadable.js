import Loadable from 'react-loadable'

import Spinner from '../Spinner'

const LoadableComponent = loader =>
  Loadable({
    loader,
    loading: Spinner
  })

export default LoadableComponent
