import { ReactNode } from 'react'
import styles from './TableCell.module.css'

type TableCellProps = {
  children?: ReactNode
  isHeader?: boolean
}

function TableCell({ children, isHeader }: TableCellProps) {
  if (isHeader) {
    return <th className={styles.th}>{children}</th>
  }
  return <td className={styles.td}>{children}</td>
}

export { TableCell }
