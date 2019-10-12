import React, { ReactNode } from 'react'
import styled from 'styled-components'

const StyledTable = styled.table`
  border-spacing: 0;
  width: 100%;
`

const Table = ({ children }: { children?: ReactNode }) => (
  <StyledTable>{children}</StyledTable>
)

export default Table
