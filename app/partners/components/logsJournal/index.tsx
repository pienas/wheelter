import { Box, Heading, Text } from "@chakra-ui/react"
import React, { FC } from "react"

type Props = {
  isOpen: boolean
  activeService: number
  plan: string
}

const Logs: FC<Props> = ({ isOpen, activeService, plan }: Props) => {
  if (plan === "STANDARD")
    return (
      <Box mr="70px" ml={isOpen ? "370px" : "170px"} transition="all 0.2s">
        <Text>Su jūsų planu šis puslapis nepasiekiamas.</Text>
      </Box>
    )
  return (
    <Box mr="70px" ml={isOpen ? "370px" : "170px"} transition="all 0.2s">
      <Heading as="h1">Veiksmų žurnalas</Heading>
    </Box>
  )
}

export default Logs
