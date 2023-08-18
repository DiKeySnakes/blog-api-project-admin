import { useEffect } from "react"
import { useUpdateUserActiveMutation } from "./userApiSlice"
import { useNavigate, useParams } from "react-router-dom"
import useTitle from "../../hooks/useTitle"
import ErrorHandler from "../../components/ErrorHandler"
import { Box, Container, Heading, Input, Button } from "@chakra-ui/react"

const UpdateUserActiveForm = () => {
  useTitle("Update user active")

  const pageParams = useParams()
  const id = pageParams.id

  const [updateUserActive, { isError, isSuccess, error }] =
    useUpdateUserActiveMutation()

  const navigate = useNavigate()

  useEffect(() => {
    if (isSuccess && !isError) {
      navigate(`/user/users`)
    }
  }, [isSuccess, isError, navigate])

  const onUpdateUserActiveClicked = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault()
    await updateUserActive(id)
  }

  const pageContent = (
    <Container maxW="9xl" centerContent>
      <ErrorHandler error={error} />

      <Heading color="gray.800" mt={5}>
        Do you really want to change
        <br />
        active property of this user?
      </Heading>

      <form onSubmit={onUpdateUserActiveClicked}>
        <Input type="text" id="content" name="content" hidden />

        <Box display="flex" alignItems="center" justifyContent="center">
          <Button type="submit" colorScheme="teal" size="md" mt={5} mb={5}>
            Submit
          </Button>
        </Box>
      </form>
    </Container>
  )

  return pageContent
}
export default UpdateUserActiveForm
