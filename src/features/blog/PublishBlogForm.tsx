import { useEffect } from "react"
import { usePublishBlogMutation } from "./blogApiSlice"
import { useNavigate, useParams } from "react-router-dom"
import { IBlog } from "./blogApiSlice"
import useTitle from "../../hooks/useTitle"
import ErrorHandler from "../../components/ErrorHandler"
import { Box, Container, Heading, Input, Button } from "@chakra-ui/react"

const PublishBlogForm = (params: { blog: IBlog }) => {
  useTitle("Publish blog")

  const pageParams = useParams()
  const id = pageParams.id

  const [publishBlog, { isError, isSuccess, error }] = usePublishBlogMutation()

  const navigate = useNavigate()

  useEffect(() => {
    if (isSuccess && !isError) {
      navigate(`/blog/blogs`)
    }
  }, [isSuccess, isError, navigate])

  const onPublishBlogClicked = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await publishBlog(id)
  }

  const pageContent = (
    <Container maxW="9xl" centerContent>
      <ErrorHandler error={error} />

      <Heading color="gray.800" mt={5}>
        Do you really want to change
        <br />
        published property of this blog?
      </Heading>

      <form onSubmit={onPublishBlogClicked}>
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
export default PublishBlogForm
