import {
  Container,
  Box,
  Heading,
  Center,
  Flex,
  Spacer,
  Text,
  Stack,
  Image,
  Card,
  CardBody,
  CardFooter,
} from "@chakra-ui/react"
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

      <Box
        as="article"
        maxW="6xl"
        borderWidth="1px"
        borderColor="gray.400"
        rounded="md"
      >
        <Card
          direction={{ base: "column", sm: "row" }}
          overflow="hidden"
          variant="outline"
        >
          <Stack>
            <Image
              p={5}
              objectFit="cover"
              src="https://cdn.pixabay.com/photo/2019/09/09/08/23/internet-4463031_1280.jpg"
              alt="Internet infrastructure scheme"
            />

            <CardBody>
              <Text py="2">
                This project was created by DiKeySnakes for The Odin Project
                Curriculum and consists of three parts: blog-api-project-server,
                blog-api-project-client and blog-api-project-admin.
                Authorization was implemented with jwt authorization and jwt
                refresh tokens. Technologies used: Node.js, Express.js, MongoDb,
                React, Redux Tool Kit, RTK Query and Chakra UI.
              </Text>
            </CardBody>

            <CardFooter>
              <Box mr={2}>
                <Text as="b">
                  In order to proceed you need to login or sign up.
                </Text>
              </Box>
              <Box ml={2}>
                <Text>
                  Only authorized users can browse content and comment.
                </Text>
              </Box>
            </CardFooter>
          </Stack>
        </Card>
      </Box>

      <Box w="80vw">
        <Center>
          <Heading as="h2" size="xl" mt={5} mb={5} color="gray.700">
            Please login or sign up
          </Heading>
        </Center>
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
          <ChakraLink as={ReactRouterLink} to="/blog/blogs" mr={15}>
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
