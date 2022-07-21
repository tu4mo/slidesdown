import { ReactNode } from 'react'
import styled from 'styled-components'

const Th = styled.th`
  border-bottom: 1px solid #000;
  padding: 0.5rem;
  text-align: left;
  vertical-align: bottom;
`

const Td = styled.td`
  padding: 0.5rem;
`

const TableCell = ({
  children,
  isHeader,
}: {
  children: ReactNode
  isHeader?: boolean
}) => (isHeader ? <Th>{children}</Th> : <Td>{children}</Td>)

export { TableCell }
