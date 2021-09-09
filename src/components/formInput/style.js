import styled from 'styled-components'

export const StyledFormInput = styled.input`
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: 1px solid ${props => props.isError ? 'red' : '#ced4da'};
  color:#212529 ;
  width: 100%;
`
