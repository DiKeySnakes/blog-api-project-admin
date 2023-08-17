import { useParams } from "react-router-dom"
import PublishBlogForm from "./PublishBlogForm"
import { useGetDetailedBlogQuery } from "./blogApiSlice"
import useAuth from "../../hooks/useAuth"
import { Spinner, Container, Box, Center, Text } from "@chakra-ui/react"
import { skipToken } from "@reduxjs/toolkit/dist/query"
import useTitle from "../../hooks/useTitle"

const PublishBlog = ({ id }: { id?: string }) => {
  useTitle("Publish blog")

  const params = useParams()
  id = params.id

  const { isAdmin } = useAuth()

  const { data, isLoading } = useGetDetailedBlogQuery(id ?? skipToken)

  let content

  if (isLoading) {
    content = (
      <Container maxW="9xl" centerContent mt={5}>
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

  if (!isAdmin) {
    return <Text>No access</Text>
  }

  content = <PublishBlogForm blog={data?.blog!} />

  return content
}
export default PublishBlog
