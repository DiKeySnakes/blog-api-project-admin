import { useParams } from "react-router-dom"
import UpdateBlogForm from "./UpdateBlogForm"
import { useGetDetailedBlogQuery } from "./blogApiSlice"
import useAuth from "../../hooks/useAuth"
import { Spinner, Container, Box, Center, Text } from "@chakra-ui/react"
import { skipToken } from "@reduxjs/toolkit/dist/query"
import useTitle from "../../hooks/useTitle"

const UpdateBlog = ({ id }: { id?: string }) => {
  useTitle("Update blog")

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

  content = <UpdateBlogForm blog={data?.blog!} />

  return content
}
export default UpdateBlog
