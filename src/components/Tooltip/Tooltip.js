import React, { Fragment } from 'react'
import { Tooltip } from 'react-tippy'
import { createGlobalStyle } from 'styled-components'

import tippyCSS from 'react-tippy/dist/tippy.css'
const GlobalStyle = createGlobalStyle`${tippyCSS}`

export default props => (
  <Fragment>
    <Tooltip arrow {...props} />
    <GlobalStyle />
  </Fragment>
)
