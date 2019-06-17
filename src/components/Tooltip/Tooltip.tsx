import React, { FC, ReactNode } from 'react'
import { Tooltip as Tippy } from 'react-tippy'

interface Props {
  children: ReactNode
  html: ReactNode
}

const Tooltip: FC<Props> = ({ children, html, ...rest }) => (
  <Tippy arrow html={html} {...rest}>
    {children}
  </Tippy>
)

export default Tooltip
