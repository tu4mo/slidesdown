import React from 'react'
import Tippy, { TippyProps } from '@tippy.js/react'
import 'tippy.js/dist/tippy.css'

const Tooltip = ({ children, content, ...rest }: TippyProps) => (
  <Tippy arrow content={content} {...rest}>
    {children}
  </Tippy>
)

export default Tooltip
