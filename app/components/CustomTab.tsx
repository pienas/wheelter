import React from "react"
import { Box, Text, useStyles, useTab } from "@chakra-ui/react"
import VehicleIcon from "./VehicleIcon"
import WrenchIcon from "./WrenchIcon"

const CustomTab = React.forwardRef((props: any, ref) => {
  const tabProps = useTab(props)
  const isSelected = !!tabProps["aria-selected"]
  const styles = useStyles()
  return (
    <Box as="button" sx={styles.tab} {...tabProps} id="wizard">
      {isSelected ? (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="center"
          mt="15px"
          position="relative"
          _before={{
            content: '""',
            position: "absolute",
            width: "100px",
            height: "8px",
            top: "-15px",
            left: "50%",
            marginLeft: "-50px",
            backgroundColor: "brand.500",
            borderRadius: "0 0 10px 10px",
          }}
        >
          {props.icon === "vehicle" ? (
            <VehicleIcon boxSize={8} color="brand.500" transition="color 0.3s ease !important" />
          ) : (
            <WrenchIcon boxSize={8} color="brand.500" transition="color 0.3s ease !important" />
          )}
          <Text
            fontSize="16px"
            fontWeight="600"
            color="brand.500"
            transition="color 0.3s ease !important"
            mt="-8px"
          >
            {tabProps.children}
          </Text>
        </Box>
      ) : (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="center"
          mt="15px"
          position="relative"
        >
          {props.icon === "vehicle" ? (
            <VehicleIcon boxSize={8} color="gray.500" transition="color 0.3s ease !important" />
          ) : (
            <WrenchIcon boxSize={8} color="gray.500" transition="color 0.3s ease !important" />
          )}
          <Text
            fontSize="16px"
            fontWeight="600"
            color="gray.500"
            transition="color 0.3s ease !important"
            mt="-8px"
          >
            {tabProps.children}
          </Text>
        </Box>
      )}
    </Box>
  )
})

export default CustomTab
