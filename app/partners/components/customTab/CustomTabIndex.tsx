import React from "react"
import { Box, Flex, Text, useStyles, useTab } from "@chakra-ui/react"

const CustomTabIndex = React.forwardRef((props: any, ref) => {
  const tabProps = useTab({ ...props, ref })
  const isSelected = !!tabProps["aria-selected"]
  const styles = useStyles()
  return (
    <Box
      as="button"
      sx={{
        ...styles.tab,
        ":focus": {
          boxShadow: "none",
        },
        ":hover div p": {
          color: "brand.500",
        },
      }}
      {...tabProps}
      p="0 !important"
    >
      {isSelected ? (
        <Flex
          justifyContent="center"
          alignItems="center"
          background="white"
          borderRadius="7px"
          width="100px"
          height="32px"
        >
          <Text color="brand.500" transition="all 0.2s">
            {tabProps.children}
          </Text>
        </Flex>
      ) : (
        <Flex justifyContent="center" alignItems="center" width="100px" height="32px">
          <Text color="text" transition="all 0.2s">
            {tabProps.children}
          </Text>
        </Flex>
      )}
    </Box>
  )
})

export default CustomTabIndex
