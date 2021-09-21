import React from "react"
import { Box, Flex, Text, useStyles, useTab } from "@chakra-ui/react"

type CustomTabSettingsProps = {
  children: React.ReactNode
  icon: React.ReactNode
}

const CustomTabSettings = React.forwardRef((props: CustomTabSettingsProps) => {
  const tabProps = useTab({ ...props })
  const isSelected = !!tabProps["aria-selected"]
  const styles = useStyles()
  return (
    <Box as="button" sx={styles.tab} {...tabProps} id="wizard" _focus={{ boxShadow: "none" }}>
      {isSelected ? (
        <Flex
          justifyContent="center"
          alignItems="center"
          background="#EFF0F3"
          borderRadius="5px"
          height="32px"
          px="25px"
          sx={{
            ":hover > svg": {
              color: "#0B132A",
            },
            ":hover > p": {
              color: "#0B132A",
            },
            svg: {
              color: "#0B132A",
            },
          }}
        >
          {props.icon}
          <Text fontWeight="500" color="#0B132A" transition="all 0.2s">
            {tabProps.children}
          </Text>
        </Flex>
      ) : (
        <Flex
          justifyContent="center"
          alignItems="center"
          height="32px"
          px="25px"
          sx={{
            ":hover > svg": {
              color: "#0B132A",
            },
            ":hover > p": {
              color: "#0B132A",
            },
          }}
        >
          {props.icon}
          <Text fontWeight="500" color="#787E97" transition="all 0.2s">
            {tabProps.children}
          </Text>
        </Flex>
      )}
    </Box>
  )
})

export default CustomTabSettings
