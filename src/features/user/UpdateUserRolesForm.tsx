import { useState, useEffect } from "react"
import { useUpdateUserRolesMutation } from "./userApiSlice"
import { useNavigate, useParams } from "react-router-dom"
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

const UpdateUserRolesForm = () => {
  useTitle("Update roles")

  const params = useParams()
  const userId = params.id

  const [updateUserRoles, { isError, isSuccess, error }] =
    useUpdateUserRolesMutation()

  const navigate = useNavigate()

  const [id, setId] = useState(userId)
  const [rolesString, setRolesString] = useState("")
  const [roles, setRoles] = useState<string[]>([])

  useEffect(() => {
    if (isSuccess && !isError) {
      setId("")
      setRolesString("")
      setRoles([])
      navigate(`/user/users`)
    }
  }, [isSuccess, isError, navigate])

  useEffect(() => {
    const splitRoles = rolesString.split(" ")
    console.log("split:", splitRoles)
    setRoles(splitRoles)
  }, [rolesString])

  const onRolesStringChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRolesString(e.target.value)
  }

  console.log("roles:", roles)

  const onUpdateRolesClicked = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await updateUserRoles({ id, roles })
  }

  const isRolesStringError = rolesString === ""

  const pageContent = (
    <Container maxW="9xl" centerContent>
      <ErrorHandler error={error} />

      <Heading color="gray.800" mt={5}>
        You can update user roles here
      </Heading>

      <form onSubmit={onUpdateRolesClicked}>
        <FormControl
          width="80vw"
          mt={5}
          mb={5}
          isRequired
          isInvalid={isRolesStringError}
        >
          <FormLabel>Text</FormLabel>
          <Input
            type="text"
            id="rolesString"
            name="rolesString"
            value={rolesString}
            onChange={onRolesStringChanged}
            required
          />
          {!isRolesStringError ? (
            <FormHelperText>
              add your roles here (space in-between)
            </FormHelperText>
          ) : (
            <FormErrorMessage>Roles are required.</FormErrorMessage>
          )}
        </FormControl>

        <Box display="flex" alignItems="center" justifyContent="center">
          <Button type="submit" colorScheme="teal" size="md" mt={5} mb={5}>
            Update roles
          </Button>
        </Box>
      </form>
    </Container>
  )

  return pageContent
}
export default UpdateUserRolesForm
