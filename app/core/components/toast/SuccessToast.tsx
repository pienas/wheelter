import React from "react"
import { Box, Circle, Center, Flex, Heading, Text, useToast } from "@chakra-ui/react"
import CheckCircleIcon from "../icons/CheckCircleIcon"
import moment from "moment"
import CrossIcon from "../icons/CrossIcon"

type Props = {
  heading: string
  text: string | React.ReactNode
  id: number
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
      p={6}
      bg="white"
      position="relative"
      borderRadius="5px"
      alignItems="center"
      boxShadow="1px 7px 14px -5px rgba(0, 0, 0, 0.2)"
    >
      <Circle backgroundColor="green.100" size="24px">
        <Center>
          <CheckCircleIcon boxSize={5} color="green.400" />
        </Center>
      </Circle>
      <Box px={6}>
        <Heading as="h4" size="sm" color="green.400">
          {heading}
        </Heading>
        <Text fontSize="sm" color="text">
          {text}
        </Text>
        <Text fontSize="xs" color="#a0a0a0">
          {moment().format("HH:mm")}
        </Text>
      </Box>
      <CrossIcon
        boxSize={5}
        color="#a0a0a0"
        onClick={close}
        cursor="pointer"
        transition="all 0.2s"
        _hover={{ color: "brand.500" }}
      />
    </Flex>
  )
}

export default SuccessToast
