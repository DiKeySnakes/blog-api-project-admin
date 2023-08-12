import { useState, useEffect } from "react"
import { useAddNewUserMutation } from "./userApiSlice"
import { useNavigate } from "react-router-dom"
import useTitle from "../../hooks/useTitle"
import ErrorHandler from "../../components/ErrorHandler"
import {
  Box,
  Container,
  Heading,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
} from "@chakra-ui/react"

const USER_REGEX = /^[A-z]{3,20}$/
const EMAIL_REGEX = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const NewUserForm = () => {
  useTitle("Sign Up")

  const [addNewUser, { isLoading, isError, isSuccess, error }] =
    useAddNewUserMutation()

  const navigate = useNavigate()

  const [username, setUsername] = useState("")
  const [validUsername, setValidUsername] = useState(false)
  const [email, setEmail] = useState("")
  const [validEmail, setValidEmail] = useState(false)
  const [password, setPassword] = useState("")
  const [validPassword, setValidPassword] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState("")
  const [validConfirmPassword, setValidConfirmPassword] = useState(false)

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username))
  }, [username])

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email))
  }, [email])

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password))
  }, [password])

  useEffect(() => {
    setValidConfirmPassword(PWD_REGEX.test(confirmPassword))
  }, [confirmPassword])

  useEffect(() => {
    if (isSuccess && !isError) {
      setUsername("")
      setEmail("")
      setPassword("")
      setConfirmPassword("")
      navigate("/auth/login")
    }
  }, [isSuccess, isError, navigate])

  // useEffect(() => {
  //   if (data) console.log(data)
  // }, [data])

  const onUsernameChanged = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUsername(e.target.value)
  const onEmailChanged = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value)
  const onPasswordChanged = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value)
  const onConfirmPasswordChanged = (e: React.ChangeEvent<HTMLInputElement>) =>
    setConfirmPassword(e.target.value)

  const canSave =
    [validUsername, validEmail, validPassword, validConfirmPassword].every(
      Boolean,
    ) && !isLoading

  const onSaveUserClicked = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (canSave) {
      await addNewUser({ username, email, password, confirmPassword })
    }
  }

  const isUsernameError = username === ""
  const isEmailError = email === ""
  const isPasswordError = password === ""
  const isConfirmPasswordError = confirmPassword === ""

  const content = (
    <Container maxW="9xl" centerContent>
      <ErrorHandler error={error} />

      <Heading color="gray.800" mt={5}>
        Please Sign Up
      </Heading>

      <form onSubmit={onSaveUserClicked}>
        <FormControl mt={5} mb={5} isRequired isInvalid={isUsernameError}>
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={onUsernameChanged}
            placeholder="3-20 letters"
            autoComplete="off"
            required
          />
          {!isUsernameError ? (
            <FormHelperText>Enter your username.</FormHelperText>
          ) : (
            <FormErrorMessage>Username is required.</FormErrorMessage>
          )}
        </FormControl>

        <FormControl mt={5} mb={5} isRequired isInvalid={isEmailError}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={onEmailChanged}
            placeholder="Email@email.com"
            required
          />
          {!isEmailError ? (
            <FormHelperText>Enter your email.</FormHelperText>
          ) : (
            <FormErrorMessage>Email is required.</FormErrorMessage>
          )}
        </FormControl>

        <FormControl mt={5} mb={5} isRequired isInvalid={isPasswordError}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={onPasswordChanged}
            placeholder="8-20 chars incl. !@#$%"
            required
          />
          {!isPasswordError ? (
            <FormHelperText>Enter your password.</FormHelperText>
          ) : (
            <FormErrorMessage>Password is required.</FormErrorMessage>
          )}
        </FormControl>

        <FormControl
          mt={5}
          mb={5}
          isRequired
          isInvalid={isConfirmPasswordError}
        >
          <FormLabel>Confirm Password</FormLabel>
          <Input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={onConfirmPasswordChanged}
            placeholder="8-20 chars incl. !@#$%"
            required
          />
          {!isConfirmPasswordError ? (
            <FormHelperText>Enter your password.</FormHelperText>
          ) : (
            <FormErrorMessage>
              Password confirmation is required.
            </FormErrorMessage>
          )}
        </FormControl>

        <Box display="flex" alignItems="center" justifyContent="center">
          <Button
            type="submit"
            disabled={!canSave}
            colorScheme={canSave ? "teal" : "red"}
            size="md"
            mt={5}
            mb={5}
          >
            Sign Up
          </Button>
        </Box>
      </form>
    </Container>
  )

  return content
}
export default NewUserForm
