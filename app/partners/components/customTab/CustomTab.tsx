import React from "react"
import { Box, Flex, Text, useStyles, useTab } from "@chakra-ui/react"

const CustomTab = React.forwardRef((props: any, ref) => {
  const tabProps = useTab({ ...props, ref })
  const isSelected = !!tabProps["aria-selected"]
  const styles = useStyles()
  return (
    <Box as="button" sx={styles.tab} {...tabProps} id="wizard">
      {isSelected ? (
        <Flex
          justifyContent="center"
          alignItems="center"
          background="#ffffff"
          borderRadius="7px"
          width="100px"
          height="32px"
        >
          <Text fontWeight="500" color="#0B132A" transition="all 0.2s">
            {tabProps.children}
          </Text>
        </Flex>
      ) : (
        <Flex justifyContent="center" alignItems="center" width="100px" height="32px">
          <Text fontWeight="500" color="#A8A8A8" transition="all 0.2s">
            {tabProps.children}
          </Text>
        </Flex>
      )}
    </Box>
  )
})

export default CustomTab
