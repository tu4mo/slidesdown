import React from 'react'
import PropTypes from 'prop-types'
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

const TableCell = ({ children, isHeader }) =>
  isHeader ? <Th>{children}</Th> : <Td>{children}</Td>

TableCell.propTypes = {
  children: PropTypes.node,
  isHeader: PropTypes.bool
}

export default TableCell
