import React from 'react'
import { StyledFormLabel } from './style'

const FormLabel = ({ children, ...restProps }) => {
  return (
    <StyledFormLabel {...restProps} >
      {children}
    </StyledFormLabel>
  )
}

export default FormLabel
