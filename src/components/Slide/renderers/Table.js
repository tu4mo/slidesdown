import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledTable = styled.table`
  border-spacing: 0;
  width: 100%;
`

const Table = ({ children }) => <StyledTable>{children}</StyledTable>

Table.propTypes = {
  children: PropTypes.node
}

export default Table
