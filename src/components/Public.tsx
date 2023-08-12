import { Container, Box, Heading, Center, Flex, Spacer } from "@chakra-ui/react"
import { Link as ReactRouterLink } from "react-router-dom"
import { Link as ChakraLink } from "@chakra-ui/react"

const Public = () => {
  const content = (
    <Container maxW="9xl" centerContent>
      <Center>
        <Heading as="h1" size="2xl" mt={5} mb={5} color="gray.700">
          Welcome to Blog Api Project
        </Heading>
      </Center>
      <Box>
        <Heading as="h2" size="xl" mt={5} mb={5} color="gray.700">
          Please login or sign up
        </Heading>
        <Flex mt={5} mb={5}>
          <ChakraLink as={ReactRouterLink} to="/auth/login" mr={15}>
            <Heading as="h3" size="lg" color="orange">
              Login
            </Heading>
          </ChakraLink>

          <Spacer />

          <ChakraLink as={ReactRouterLink} to="/auth/sign_up" mr={15}>
            <Heading as="h3" size="lg" color="orange">
              Sign Up
            </Heading>
          </ChakraLink>
        </Flex>
        <Center mb={5}>
          <ChakraLink as={ReactRouterLink} to="/blog/blogs_all" mr={15}>
            <Heading as="h3" size="lg" color="teal">
              All Blogs
            </Heading>
          </ChakraLink>
        </Center>
      </Box>
    </Container>
  )
  return content
}
export default Public
