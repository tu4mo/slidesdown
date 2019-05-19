import { FC, ReactElement, useEffect, useState } from 'react'
import throttle from 'lodash.throttle'

const getWidth = () => window.innerWidth

interface Props {
  children?(props: { width: number }): ReactElement
  onResize?(): void
}

const WindowResizeObserver: FC<Props> = ({ children, onResize }) => {
  const [width, setWidth] = useState(getWidth())

  const handleResize = throttle(() => {
    setWidth(getWidth())
    onResize && onResize()
  }, 100)

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [handleResize])

  return children ? children({ width }) : null
}

export default WindowResizeObserver
