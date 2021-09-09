import React from 'react'
import { StyledContainer } from './style'



const Container = ({ children, ...restProps }) => {
  return (
    <StyledContainer {...restProps} >
      {children}
    </StyledContainer>
  )
}

export default Container
