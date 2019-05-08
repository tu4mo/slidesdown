import React, { Fragment } from 'react'
import { Tooltip } from 'react-tippy'

import 'react-tippy/dist/tippy.css'

export default props => (
  <Fragment>
    <Tooltip arrow {...props} />
  </Fragment>
)
