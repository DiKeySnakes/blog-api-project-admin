import { useState, useEffect } from "react"
import { useAddNewCommentMutation } from "./commentApiSlice"
import { useNavigate, useParams } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import useTitle from "../../hooks/useTitle"
import ErrorHandler from "../../components/ErrorHandler"
import {
  Box,
  Container,
  Heading,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
} from "@chakra-ui/react"

const NewCommentForm = () => {
  useTitle("Add comment")

  const { username } = useAuth()

  const params = useParams()
  const id = params.id

  const [addNewComment, { isError, isSuccess, error }] =
    useAddNewCommentMutation()

  const navigate = useNavigate()

  const [user, setUser] = useState(username)
  const [blog, setBlog] = useState(id)
  const [content, setContent] = useState("")

  useEffect(() => {
    if (isSuccess && !isError) {
      setUser("")
      setBlog("")
      setContent("")
      navigate(`/blog/${blog}`)
    }
  }, [isSuccess, isError, blog, navigate])

  // useEffect(() => {
  //   if (data) console.log(data)
  // }, [data])

  const onContentChanged = (e: React.ChangeEvent<HTMLInputElement>) =>
    setContent(e.target.value)

  const onSaveCommentClicked = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await addNewComment({ content, blog, user })
  }

  const isContentError = content === ""

  const pageContent = (
    <Container maxW="9xl" centerContent>
      <ErrorHandler error={error} />

      <Heading color="gray.800" mt={5}>
        You can add your comment here
      </Heading>

      <form onSubmit={onSaveCommentClicked}>
        <FormControl mt={5} mb={5} isRequired isInvalid={isContentError}>
          <FormLabel>Text</FormLabel>
          <Input
            type="text"
            id="content"
            name="content"
            value={content}
            onChange={onContentChanged}
            required
          />
          {!isContentError ? (
            <FormHelperText>add your comment here.</FormHelperText>
          ) : (
            <FormErrorMessage>Text is required.</FormErrorMessage>
          )}
        </FormControl>

        <Box display="flex" alignItems="center" justifyContent="center">
          <Button type="submit" colorScheme="teal" size="md" mt={5} mb={5}>
            Add comment
          </Button>
        </Box>
      </form>
    </Container>
  )

  return pageContent
}
export default NewCommentForm
