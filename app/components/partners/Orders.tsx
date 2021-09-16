import { Box, Heading } from "@chakra-ui/react"
import React, { FC } from "react"

type Props = {
  isOpen: boolean
  activeService: number
}

const Orders: FC<Props> = ({ isOpen, activeService }: Props) => {
  return (
    <Box mr="70px" ml={isOpen ? "370px" : "170px"} transition="all 0.2s">
      <Heading as="h1">Užsakymai</Heading>
    </Box>
  )
}

export default Orders
