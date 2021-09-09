import styled from 'styled-components'

export const StyledSelect = styled.select`
  display: block;
  font-size: 1rem;
  padding: 0.5rem 1rem 0.5rem 0.5rem;
  width: 100%;
  border: 1px solid ${props => props.isError ? 'red' : '#ced4da'};
  color:#212529 ;
  border-radius: 8px;
`