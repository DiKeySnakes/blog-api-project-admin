import useAuth from "../hooks/useAuth"
import { useParams } from "react-router-dom"
import {
  Container,
  Box,
  Heading,
  Spacer,
  Flex,
  Center,
  Text,
} from "@chakra-ui/react"
import { Link as ReactRouterLink } from "react-router-dom"
import { Link as ChakraLink } from "@chakra-ui/react"

export default function Nav() {
  const { username } = useAuth()

  const params = useParams()
  const id = params.id

  return (
    <Container
      maxW="9xl"
      bg="gray.200"
      color="gray.800"
      pos="sticky"
      zIndex={5}
      top={0}
      left={0}
    >
      <Flex>
        <Box>
          <ChakraLink as={ReactRouterLink} to="/blog/blogs" mr={15}>
            <Heading mt={2} mb={2}>
              Blog API Project
            </Heading>
          </ChakraLink>
        </Box>
        <Spacer />
        <Center>
          <Text as="b" mr={15}>
            {username}
          </Text>

          <ChakraLink
            as={ReactRouterLink}
            to={username ? "/auth/logout" : "/auth/login"}
            mr={15}
          >
            {username ? <Text as="b">Logout</Text> : <Text as="b">Login</Text>}
          </ChakraLink>

          <ChakraLink
            as={ReactRouterLink}
            to={id ? `/comment/create/${id}` : "/auth/sign_up"}
            mr={15}
          >
            {id ? <Text as="b">Comment</Text> : <Text as="b">Sign Up</Text>}
          </ChakraLink>

          <ChakraLink as={ReactRouterLink} to="/blog/create_blog" mr={15}>
            <Text as="b">Create New Blog</Text>
          </ChakraLink>

          <ChakraLink as={ReactRouterLink} to="/user/users">
            <Text as="b">Get All Users</Text>
          </ChakraLink>
        </Center>
      </Flex>
    </Container>
  )
}
