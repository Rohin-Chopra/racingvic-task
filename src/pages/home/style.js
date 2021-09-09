import styled from 'styled-components'
import Button from '../../components/button'


export const Headline = styled.h1`
  margin:1rem 0 ;
`
export const InputFileHeading = styled.h5`
  margin-bottom:0.5rem;
`
export const FormWrapper = styled.div`
  margin-top: 1rem;
  padding: 1.5rem 1rem;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
`
export const FormGroup = styled.div`
`
export const FormRadioInput = styled.input`
  margin: 0 0.5rem 0 0.2rem;
`

export const FormSubmitButton = styled(Button)`
  width: 100%;
  background: #222831;
  border-color: #222831;
  color:#fff;
`
export const TableWrapper = styled.div`
  margin-top: 4rem;
`

export const Td = styled.td`
  border: 1px solid #ddd;
  text-align: left;
  padding: 0.5rem;
`
export const Th = styled.th`
  border: 1px solid #ddd;
  text-align: left;
  padding: 0.5rem;
`
export const FormError = styled.span`
  display: block;
  color: red;
  margin: 0.2rem 0 0.8rem 0.2rem;
  font-size: 0.8rem;
`
export const UserExistsWrapper = styled.div`
  margin-bottom: 1rem;
`
export const UserExistsMessage = styled.p`
  color:red;
`
export const UserExistsRadioButtonsWrapper = styled.div`
  margin: 0.5rem 0;
`
export const ExportButton = styled.a`
  display:inline-block;
  background: green;
  border-color: green;
  margin-top: 1rem;
  outline: none;
  cursor: pointer;
  padding: 0.5rem 0.8rem;
  border-radius: 0.5rem;
  border: 1px solid #150050;
  text-align: center;
  font-size: 1rem;
  color: #fff;
  text-decoration:none;
`