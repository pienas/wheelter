import React from "react"
import { Box } from "@chakra-ui/react"

type Props = {
  isSelected: boolean
  children: React.ReactNode
  onChange: (index: number) => void
  value: number
}

const RadioPill = ({ isSelected, children, onChange, value }: Props) => {
  return (
    <Box
      borderRadius="5px"
      cursor="pointer"
      px={4}
      py={2}
      transition="background-color 0.3s ease !important"
      _hover={{ background: "brand.500", color: "white" }}
      background={isSelected ? "brand.500" : "transparent"}
      color={isSelected ? "white" : "inherit"}
      onClick={() => onChange(value)}
    >
      {children}
    </Box>
  )
}

export default RadioPill
