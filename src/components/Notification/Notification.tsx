import { ReactNode, useEffect, useState } from 'react'
import styles from './Notification.module.css'

type Props = {
  children: ReactNode
  className?: string
  timeout?: number
  slideDown?: boolean
}

function Notification({
  children,
  className,
  timeout = 15000,
  slideDown = false,
}: Props) {
  const [hasTimedOut, setHasTimedOut] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setHasTimedOut(true), timeout)
    return () => clearTimeout(timer)
  }, [timeout])

  if (hasTimedOut) return null

  const classes = [
    styles.notification,
    slideDown ? styles.slideDown : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return <div className={classes}>{children}</div>
}

export { Notification }
