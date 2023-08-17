import { useEffect } from "react"
import { useDeleteCommentMutation } from "./commentApiSlice"
import { useNavigate, useParams } from "react-router-dom"
import useTitle from "../../hooks/useTitle"
import ErrorHandler from "../../components/ErrorHandler"
import { Box, Container, Heading, Input, Button } from "@chakra-ui/react"

const DeleteCommentForm = () => {
  useTitle("Delete comment")

  const params = useParams()
  const id = params.id

  const [deleteComment, { isError, isSuccess, error }] =
    useDeleteCommentMutation()

  const navigate = useNavigate()

  useEffect(() => {
    if (isSuccess && !isError) {
      navigate(`/blog/blogs_all`)
    }
  }, [isSuccess, isError, navigate])

  const onDeleteCommentClicked = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault()
    await deleteComment({ id })
  }

  const pageContent = (
    <Container maxW="9xl" centerContent>
      <ErrorHandler error={error} />

      <Heading color="gray.800" mt={5}>
        Do you really want to delete this comment?
      </Heading>

      <form onSubmit={onDeleteCommentClicked}>
        <Input type="text" id="content" name="content" hidden />

        <Box display="flex" alignItems="center" justifyContent="center">
          <Button type="submit" colorScheme="teal" size="md" mt={5} mb={5}>
            Delete comment
          </Button>
        </Box>
      </form>
    </Container>
  )

  return pageContent
}
export default DeleteCommentForm
