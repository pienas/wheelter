import React from "react"
import { Box, Circle, Center, Flex, Heading, Text, useToast } from "@chakra-ui/react"
import { CloseIcon } from "@chakra-ui/icons"
import moment from "moment"
import WarningIcon from "../icons/WarningIcon"

type Props = {
  heading: string
  text: string
  id: number
}

const WarningToast = ({ heading, text, id }: Props) => {
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
      bg="rgba(255, 255, 255, 0.5)"
      position="relative"
      borderRadius="5px"
      alignItems="center"
      boxShadow="1px 7px 14px -5px rgba(0, 0, 0, 0.2)"
    >
      <Circle backgroundColor="orange.100" size="24px">
        <Center>
          <WarningIcon boxSize={3} color="orange.400" />
        </Center>
      </Circle>
      <Box px={6}>
        <Heading as="h4" size="sm" color="orange.400">
          {heading}
        </Heading>
        <Text fontSize="sm" color="text">
          {text}
        </Text>
        <Text fontSize="xs" color="#a0a0a0">
          {moment().format("HH:mm")}
        </Text>
      </Box>
      <CloseIcon
        boxSize={3}
        color="#a0a0a0"
        onClick={close}
        cursor="pointer"
        transition="all 0.2s"
        _hover={{ color: "brand.500" }}
      />
    </Flex>
  )
}

export default WarningToast
