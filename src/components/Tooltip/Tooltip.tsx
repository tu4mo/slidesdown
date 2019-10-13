import React, { FC } from 'react'
import Tippy, { TippyProps } from '@tippy.js/react'
import 'tippy.js/dist/tippy.css'

const Tooltip: FC<TippyProps> = ({ children, content, ...rest }) => (
  <Tippy arrow content={content} {...rest}>
    {children}
  </Tippy>
)

export default Tooltip
