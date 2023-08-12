import { Container, Text, Center } from "@chakra-ui/react"

function Footer() {
  return (
    <Container maxW="9xl" bg="gray.200" color="gray.800" mt={5}>
      <Center>
        <Text mt={3} mb={3}>
          Copyright &copy; DiKeySnakes 2023
        </Text>
      </Center>
    </Container>
  )
}

export default Footer
