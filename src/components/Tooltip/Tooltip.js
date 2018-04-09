import React from 'react'
import { Tooltip } from 'react-tippy'
import { injectGlobal } from 'styled-components'

import tippyCSS from 'react-tippy/dist/tippy.css'
injectGlobal`${tippyCSS}`

export default props => <Tooltip arrow {...props} />
