import { useGetALLBlogsQuery } from "./blogApiSlice"
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

const BlogsList = () => {
  useTitle("Blogs List")

  const {
    data: blogs,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetALLBlogsQuery()

  let content

  if (isLoading) {
    content = (
      <Container maxW="9xl" centerContent>
        <Box mt={5}>
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
    const blogsContent =
      blogs?.length &&
      blogs.map((blog) => (
        <Box
          key={blog._id}
          id={blog._id}
          as="article"
          maxW="6xl"
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
              src={blog.image}
              alt="Latte"
            />

            <Stack w="100%">
              <CardBody>
                <ReactRouterLink to={`/blog/${blog._id}`}>
                  <Heading size="md">{blog.title}</Heading>
                </ReactRouterLink>

                <Text py="2">{blog.description}</Text>
              </CardBody>

              <CardFooter w="100%">
                <Flex w="100%">
                  <Flex>
                    <Box mr={2}>
                      <Text as="b">by MariiaN </Text>
                    </Box>
                    <Box ml={2}>
                      <Text>
                        {format(new Date(blog.createdAt), "dd MMM yyyy")}
                      </Text>
                    </Box>
                  </Flex>

                  <Spacer />

                  <Box>
                    <ReactRouterLink to={`/blog/publish/${blog._id}`}>
                      <Button colorScheme={blog.published ? "red" : "teal"}>
                        {blog.published ? "Unpublish" : "Publish"}
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
            All Blogs
          </Heading>
          {blogsContent}
        </Box>
      </Container>
    )
  }

  return content
}
export default BlogsList
