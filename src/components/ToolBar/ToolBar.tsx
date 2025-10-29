import { ReactNode } from 'react'
import styles from './ToolBar.module.css'

type Props = {
  children: ReactNode
}

export function ToolBar({ children }: Props) {
  return <div className={styles.toolbar}>{children}</div>
}
