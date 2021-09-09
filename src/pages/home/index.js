import React, { useState, useEffect } from 'react'
import Container from './../../components/container'
import FormLabel from './../../components/formLabel'
import FormInput from './../../components/formInput'
import Select from './../../components/select'
import defaultUsers from "./../../users.json"
import Table from './../../components/table'
import {
  FormError,
  FormWrapper,
  Headline, ExportButton,
  FormGroup,
  FormRadioInput,
  TableWrapper,
  Td,
  Th,
  UserExistsMessage,
  UserExistsRadioButtonsWrapper,
  UserExistsWrapper,
  FormSubmitButton,
  InputFileHeading
} from './style'

const recipes = {
  indian: ["Chickpea curry", "Samosa", "Biryani"],
  italian: ["Pizza", "Pasta", "Risotto"],
  mexican: ["Enchiladas", "Burrito", "Tacos"],
}

// set initial state
const defaultStates = {
  users: [],
  inputs: {
    username: '',
    recipeType: '',
    recipe: '',
    overrideUser: 'false'
  },
  errors: {
    username: '',
    recipeType: '',
    recipe: '',
    usersFile: ''
  }
}

const Home = () => {

  const [users, setUsers] = useState([...defaultStates.users])
  const [inputs, setInputs] = useState({ ...defaultStates.inputs })
  const [errors, setErrors] = useState({ ...defaultStates.errors })

  useEffect(() => {
    try {
      const loadedUsers = JSON.parse(JSON.stringify(defaultUsers))
      setUsers(loadedUsers)
    } catch (error) {
      // TODO: show error if the file given is invalid
      console.log(error)
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setInputs({
      ...inputs,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const localErrors =
      { ...defaultStates.errors }

    // validate the form
    let isFormValid = true
    if (inputs.username.length === 0) {
      localErrors.username = 'Username cannot be empty'
      isFormValid = false
    }
    if (inputs.recipeType.length === 0) {
      localErrors.recipeType = 'Recipe type cannot be empty'
      isFormValid = false
    }
    if (inputs.recipe.length === 0) {
      localErrors.recipe = 'Recipe cannot be empty'
      isFormValid = false
    }

    // wrapped in if block to prevent unnecessary loop of users if the form is not valid
    if (isFormValid) {
      // check if the exists by filtering the user array
      const userExists = users.filter((user) => user.username.toLowerCase() === inputs.username.toLowerCase()).length > 0

      if (userExists) {
        // override the user if they agree to do so
        if (inputs.overrideUser === "true") {
          const filteredUsers = users.filter((user) => user.username.toLowerCase() !== inputs.username.toLowerCase())
          setUsers([...filteredUsers, {
            ...inputs
          }])
          setInputs({
            ...inputs,
            overrideUser: "false"
          })
        }
        else {
          localErrors.username = 'Username already exists'
          isFormValid = false
        }
      }
      else {
        setUsers([...users, {
          ...inputs
        }])
      }
    }
    setErrors(localErrors)
  }

  const handleFileInput = (e) => {
    const localErrors =
      { ...defaultStates.errors }

    const fileReader = new FileReader()
    const file = e.target.files[0]
    fileReader.readAsText(file, "UTF-8")

    // catches a invalid JSON file and non JSON files as well
    try {
      if (file && file.type === 'application/json') {
        fileReader.onload = e => {
          // set the loaded users to users state
          const loadedUsers = JSON.parse(e.target.result)
          setUsers(loadedUsers)
        }
      } else {
        throw Error('Invalid file')
      }
    } catch (error) {
      localErrors.usersFile = 'Invalid File! Only accept a valid JSON file'
    }
    setErrors(localErrors)
  }

  return (
    <div>
      <Container>
        <Headline>RacingVic Task</Headline>
        <div>
          <InputFileHeading>Select a file or use the default loaded file</InputFileHeading>
          <input type="file" onChange={handleFileInput} />
          <FormError>{errors.usersFile}</FormError>
        </div>
        <FormWrapper>
          <FormGroup>
            <FormLabel>Username</FormLabel>
            <FormInput name='username' isError={errors.username} value={inputs.username} onChange={handleChange} />
            <FormError>{errors.username}</FormError>
          </FormGroup>
          <FormGroup>
            <FormLabel>Recipe type</FormLabel>
            <Select name='recipeType' isError={errors.recipeType} value={inputs.recipeType} onChange={handleChange}>
              <option value='' disabled hidden>Choose a recipe type</option>
              <option value='indian'>Indian recipes</option>
              <option value='italian'>Italian recipes</option>
              <option value='mexican'>Mexican recipes</option>
            </Select>
            <FormError>{errors.recipeType}</FormError>
          </FormGroup>
          <FormGroup>
            <FormLabel>Recipe {inputs.recipeType && `for ${inputs.recipeType}`}</FormLabel>
            <Select name='recipe' isError={errors.recipe} value={inputs.recipe} onChange={handleChange}>
              <option value='' disabled hidden>Choose a recipe</option>
              {
                inputs.recipeType && recipes[inputs.recipeType].map((recipe) =>
                  <option key={recipe} value={recipe}>{recipe}</option>
                )
              }
            </Select>
            <FormError>{errors.recipe}</FormError>
          </FormGroup>
          <div>
            {
              errors.username === 'Username already exists' && (
                <UserExistsWrapper>
                  <UserExistsMessage>It appears that this username is already taken, do want to override it?</UserExistsMessage>
                  <UserExistsRadioButtonsWrapper>
                    <label>Yes </label>
                    <FormRadioInput type="radio" name="overrideUser" value="true" onChange={handleChange} />
                    <label>No</label>
                    <FormRadioInput type="radio" name="overrideUser" value="false" onChange={handleChange} />
                  </UserExistsRadioButtonsWrapper>
                  {
                    inputs.overrideUser && (
                      inputs.overrideUser === "true" ? (
                        <p>Please click on submit</p>
                      ) : (
                        <p>Choose a different username</p>
                      )
                    )
                  }
                </UserExistsWrapper>
              )
            }
          </div>
          <FormSubmitButton onClick={handleSubmit}>Submit</FormSubmitButton>
        </FormWrapper>
        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <Th>Username</Th>
                <Th>Recipe type</Th>
                <Th>Recipe</Th>
              </tr>
            </thead>
            <tbody>
              {
                users.map((user) =>
                  <tr key={user.username}>
                    <Td>{user.username}</Td>
                    <Td>{user.recipeType}</Td>
                    <Td>{user.recipe}</Td>
                  </tr>)
              }
            </tbody>
          </Table>
          <ExportButton
            href={`data:text/json;charset=utf-8,${encodeURIComponent(
              JSON.stringify(users)
            )}`}
            download="users.json"
          >Export</ExportButton>
        </TableWrapper>
      </Container>
    </div>
  )
}

export default Home
