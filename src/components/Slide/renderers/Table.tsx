import { ReactNode } from 'react'
import styles from './Table.module.css'

export function Table({ children }: { children?: ReactNode }) {
  return <table className={styles.table}>{children}</table>
}
