import React from "react"
import { Box, Flex, Text, useStyles, useTab } from "@chakra-ui/react"

const CustomTabNotifications = React.forwardRef((props: any, ref) => {
  const tabProps = useTab({ ...props, ref })
  const isSelected = !!tabProps["aria-selected"]
  const styles = useStyles()
  return (
    <Box
      as="button"
      sx={{
        ":focus": {
          boxShadow: "none",
        },
        ":hover > div > p": {
          color: "brand.500",
        },
      }}
      p="0 !important"
      {...tabProps}
    >
      {isSelected ? (
        <Flex
          justifyContent="center"
          alignItems="center"
          background="#ffffff"
          height="32px"
          py="25px"
          borderBottom="2px solid"
          borderColor="brand.500"
          mr="30px"
          mb="-1px"
        >
          <Text fontWeight="500" color="#0B132A">
            {tabProps.children}
          </Text>
        </Flex>
      ) : (
        <Flex justifyContent="center" alignItems="center" height="32px" mr="30px" py="25px">
          <Text fontWeight="500" color="#A8A8A8">
            {tabProps.children}
          </Text>
        </Flex>
      )}
    </Box>
  )
})

export default CustomTabNotifications
