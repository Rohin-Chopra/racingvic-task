import React from 'react'
import { StyledButton } from './style'

const Button = ({ children, ...otherProps }) => {
  return (
    <StyledButton {...otherProps}>
      {children}
    </StyledButton>
  )
}

export default Button
