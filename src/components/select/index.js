import React from 'react'
import { StyledSelect } from './style'

const Select = ({ children, ...restProps }) => {
  return (
    <StyledSelect {...restProps} >
      {children}
    </StyledSelect>
  )
}

export default Select
