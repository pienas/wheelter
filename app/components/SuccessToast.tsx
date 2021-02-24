import React from "react"
import { Box, Flex, Heading, Text, useToast } from "@chakra-ui/react"
import { CheckCircleIcon, CloseIcon } from "@chakra-ui/icons"

type Props = {
  heading: string
  text: string
  id: any
}

const SuccessToast = ({ heading, text, id }: Props) => {
  const toast = useToast()
  const close = () => {
    if (id) {
      toast.close(id)
    }
  }
  return (
    <Flex
      color="black"
      p={5}
      bg="white"
      position="relative"
      borderRadius="5px"
      alignItems="center"
      boxShadow="1px 7px 14px -5px rgba(0, 0, 0, 0.2)"
      _before={{
        content: '""',
        position: "absolute",
        top: "0",
        left: "0",
        width: "5px",
        height: "100%",
        borderTopLeftRadius: "5px",
        borderBottomLeftRadius: "5px",
        backgroundColor: "#2bde3f",
      }}
    >
      <CheckCircleIcon boxSize={8} color="#2bde3f" />
      <Box px={8}>
        <Heading as="h4" size="md">
          {heading}
        </Heading>
        <Text fontSize="sm" color="gray.500">
          {text}
        </Text>
      </Box>
      <CloseIcon boxSize={4} color="gray.400" onClick={close} cursor="pointer" />
    </Flex>
  )
}

export default SuccessToast
