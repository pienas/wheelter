import { Text } from "@chakra-ui/react"

const BrandText = ({ children }) => {
  return (
    <Text fontWeight="700" color="brand.500" display="inline">
      {children}
    </Text>
  )
}

export default BrandText
