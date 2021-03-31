import { Box, Heading } from "@chakra-ui/layout"
import React, { FC } from "react"

type Props = {
  isOpen: boolean
  activeService: number
}

const Stats: FC<Props> = ({ isOpen, activeService }: Props) => {
  return (
    <Box mr="70px" ml={isOpen ? "370px" : "170px"} transition="all 0.2s">
      <Heading as="h1">Statistika</Heading>
    </Box>
  )
}

export default Stats
