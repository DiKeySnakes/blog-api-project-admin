import { useGetUsersQuery } from "./userApiSlice"
import useTitle from "../../hooks/useTitle"
import { Link as ReactRouterLink } from "react-router-dom"
import format from "date-fns/format"
import ErrorHandler from "../../components/ErrorHandler"
import {
  Spinner,
  Container,
  Card,
  CardBody,
  CardFooter,
  Stack,
  Heading,
  Text,
  Image,
  Box,
  Center,
  Flex,
  Spacer,
  Button,
} from "@chakra-ui/react"

const UsersList = () => {
  useTitle("Users List")

  const { data, isLoading, isSuccess, isError, error } = useGetUsersQuery()

  let content

  if (isLoading) {
    content = (
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
  }

  if (isError) {
    content = (
      <Container maxW="9xl" centerContent>
        <Box>
          <Center>
            <ErrorHandler error={error} />
          </Center>
        </Box>
      </Container>
    )
  }

  if (isSuccess) {
    const usersContent =
      data?.length &&
      data.map((user) => (
        <Box
          key={user._id}
          id={user._id}
          as="article"
          width="80vw"
          p="5"
          borderWidth="1px"
          borderColor="gray.400"
          rounded="md"
          mt={10}
          mb={10}
        >
          <Card
            direction={{ base: "column", sm: "row" }}
            overflow="hidden"
            variant="outline"
          >
            <Image
              objectFit="cover"
              maxW={{ base: "100%", sm: "200px" }}
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              alt="User avatar"
            />

            <Stack w="100%">
              <CardBody>
                <ReactRouterLink to={`/user/${user._id}`}>
                  <Heading size="md">{user.username}</Heading>
                </ReactRouterLink>

                <Text py="2">{user.email}</Text>
              </CardBody>

              <CardFooter w="100%">
                <Flex w="100%">
                  <Flex>
                    <Box mr={2}>
                      <Text as="b">{user.active ? "Active" : "Banned"}</Text>
                    </Box>
                    <Box ml={2}>
                      <Text as="i">
                        Created at:{" "}
                        {format(new Date(user.createdAt), "dd MMM yyyy")}
                      </Text>
                    </Box>
                  </Flex>

                  <Spacer />

                  <Box>
                    <ReactRouterLink to={`/blog/publish/${user._id}`}>
                      <Button colorScheme={user.active ? "red" : "teal"}>
                        {user.active ? "Deactivate" : "Activate"}
                      </Button>
                    </ReactRouterLink>
                  </Box>
                </Flex>
              </CardFooter>
            </Stack>
          </Card>
        </Box>
      ))

    content = (
      <Container maxW="9xl" color="white" centerContent>
        <Box padding="4" color="white" maxW="4xl">
          <Heading color="gray.800" mt={5}>
            All Users
          </Heading>
          <Container maxW="9xl" centerContent>
            {usersContent}
          </Container>
        </Box>
      </Container>
    )
  }

  return content
}
export default UsersList
