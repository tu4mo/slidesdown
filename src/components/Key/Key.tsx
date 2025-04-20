import { ReactNode } from 'react'
import styles from './Key.module.css'

export function Key({ children }: { children: ReactNode }) {
  return <span className={styles.key}>{children}</span>
}
