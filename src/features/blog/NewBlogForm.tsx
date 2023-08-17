import { useState, useEffect } from "react"
import { useAddNewBlogMutation } from "./blogApiSlice"
import { useNavigate } from "react-router-dom"
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
  Textarea,
  Button,
} from "@chakra-ui/react"

const NewBlogForm = () => {
  useTitle("Create blog")

  const [addNewBlog, { isError, isSuccess, error }] = useAddNewBlogMutation()

  const navigate = useNavigate()

  const [image, setImage] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [content, setContent] = useState("")

  useEffect(() => {
    if (isSuccess && !isError) {
      setImage("")
      setTitle("")
      setDescription("")
      setContent("")
      navigate(`/blog/blogs`)
    }
  }, [isSuccess, isError, navigate])

  const onImageChanged = (e: React.ChangeEvent<HTMLInputElement>) =>
    setImage(e.target.value)

  const onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value)

  const onDescriptionChanged = (e: React.ChangeEvent<HTMLInputElement>) =>
    setDescription(e.target.value)

  const onContentChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setContent(e.target.value)

  const onSaveBlogClicked = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await addNewBlog({ image, title, description, content })
  }

  const isImageError = image === ""
  const isTitleError = title === ""
  const isDescriptionError = description === ""
  const isContentError = content === ""

  const pageContent = (
    <Container maxW="9xl" centerContent>
      <ErrorHandler error={error} />

      <Heading color="gray.800" mt={5}>
        You can create a new blog here
      </Heading>

      <form onSubmit={onSaveBlogClicked}>
        <FormControl mt={5} mb={5} isRequired isInvalid={isImageError}>
          <FormLabel>Image url</FormLabel>
          <Input
            type="url"
            id="image"
            name="image"
            value={image}
            onChange={onImageChanged}
            pattern="https://.*"
            required
          />
          {!isImageError ? (
            <FormHelperText>add your image url here.</FormHelperText>
          ) : (
            <FormErrorMessage>Image url is required.</FormErrorMessage>
          )}
        </FormControl>

        <FormControl mt={5} mb={5} isRequired isInvalid={isTitleError}>
          <FormLabel>Title</FormLabel>
          <Input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={onTitleChanged}
            required
          />
          {!isTitleError ? (
            <FormHelperText>add your blog title here.</FormHelperText>
          ) : (
            <FormErrorMessage>Blog title is required.</FormErrorMessage>
          )}
        </FormControl>

        <FormControl mt={5} mb={5} isRequired isInvalid={isDescriptionError}>
          <FormLabel>Description</FormLabel>
          <Input
            type="text"
            id="description"
            name="description"
            value={description}
            onChange={onDescriptionChanged}
            required
          />
          {!isDescriptionError ? (
            <FormHelperText>add your blog description here.</FormHelperText>
          ) : (
            <FormErrorMessage>Blog description is required.</FormErrorMessage>
          )}
        </FormControl>

        <FormControl mt={5} mb={5} isRequired isInvalid={isContentError}>
          <FormLabel>Content</FormLabel>
          <Textarea
            size="lg"
            id="content"
            name="content"
            value={content}
            onChange={onContentChanged}
            required
          />
          {!isContentError ? (
            <FormHelperText>add your blog content here.</FormHelperText>
          ) : (
            <FormErrorMessage>Blog content is required.</FormErrorMessage>
          )}
        </FormControl>

        <Box display="flex" alignItems="center" justifyContent="center">
          <Button type="submit" colorScheme="teal" size="md" mt={5} mb={5}>
            Create new blog
          </Button>
        </Box>
      </form>
    </Container>
  )

  return pageContent
}
export default NewBlogForm
