import React from "react"
import { Box, Flex, Text, useStyles, useTab } from "@chakra-ui/react"

const CustomTabSettings = React.forwardRef((props: any, ref) => {
  const tabProps = useTab(props)
  const isSelected = !!tabProps["aria-selected"]
  const styles = useStyles()
  return (
    <Box as="button" sx={styles.tab} {...tabProps} id="wizard">
      {isSelected ? (
        <Flex
          justifyContent="center"
          alignItems="center"
          background="#EFF0F3"
          borderRadius="5px"
          height="32px"
          mr="30px"
          px="25px"
        >
          <Text fontWeight="500" color="#0B132A" transition="all 0.2s">
            {tabProps.children}
          </Text>
        </Flex>
      ) : (
        <Flex justifyContent="center" alignItems="center" mr="30px" height="32px" px="25px">
          <Text fontWeight="500" color="#787E97" transition="all 0.2s">
            {tabProps.children}
          </Text>
        </Flex>
      )}
    </Box>
  )
})

export default CustomTabSettings