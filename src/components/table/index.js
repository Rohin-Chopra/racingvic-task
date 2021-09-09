import React from 'react'
import { StyledTable } from './style'

const Table = ({ children, ...restProps }) => {
  return (
    <StyledTable {...restProps} >
      {children}
    </StyledTable>
  )
}

export default Table
