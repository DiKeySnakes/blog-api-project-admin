import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSendLogoutMutation } from "./authApiSlice"
import useTitle from "../../hooks/useTitle"
import ErrorHandler from "../../components/ErrorHandler"
import {
  Box,
  Container,
  Heading,
  Button,
  Center,
  Spinner,
} from "@chakra-ui/react"

const Logout = () => {
  useTitle("Add comment")
  const navigate = useNavigate()

  const [sendLogout, { isLoading, isSuccess, error }] = useSendLogoutMutation()

  useEffect(() => {
    if (isSuccess) navigate("/auth/login")
  }, [isSuccess, navigate])

  if (isLoading)
    return (
      <Container maxW="9xl" centerContent>
        <Box>
          <Center>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </Center>
        </Box>
      </Container>
    )

  const pageContent = (
    <Container maxW="9xl" centerContent>
      <ErrorHandler error={error} />

      <Heading color="gray.800" mt={5} mb={5}>
        Are you really want to logout?
      </Heading>

      <Box display="flex" alignItems="center" justifyContent="center">
        <Button onClick={sendLogout}>LOGOUT</Button>
      </Box>
    </Container>
  )

  return pageContent
}
export default Logout
