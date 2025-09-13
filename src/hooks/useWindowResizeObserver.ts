import { useEffect, useState } from 'react'
import throttle from 'lodash.throttle'

function getWidth() {
  return window.innerWidth
}

function useWindowResizeObserver(onResize?: () => void) {
  const [width, setWidth] = useState(getWidth())

  useEffect(() => {
    const handleResize = throttle(() => {
      setWidth(getWidth())
      onResize?.()
    }, 100)

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [onResize])

  return width
}

export { useWindowResizeObserver }
