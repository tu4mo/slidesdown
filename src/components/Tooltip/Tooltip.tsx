import Tippy, { TippyProps } from '@tippy.js/react'
import 'tippy.js/dist/tippy.css'

function Tooltip({ children, content, ...rest }: TippyProps) {
  return (
    <Tippy
      arrow
      content={content}
      {...rest}
    >
      {children}
    </Tippy>
  )
}

export { Tooltip }
