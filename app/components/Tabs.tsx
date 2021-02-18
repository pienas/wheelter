import React from "react"
import {
  Tabs as ChakraTabs,
  TabList,
  TabPanels,
  TabPanel,
  FormControl,
  FormLabel,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Box,
  useDisclosure,
} from "@chakra-ui/react"
import CustomTab from "./CustomTab"
import "react-day-picker/lib/style.css"
import DaySelector from "./DaySelector"
import { DaySelectionTypes } from "./DaySelector"

const Tabs = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <ChakraTabs variant="unstyled" isFitted>
      <TabList ml="15%" mr="15%" mb="20px">
        <CustomTab icon="vehicle">Paslauga</CustomTab>
        <CustomTab icon="wrench">Paslaugų teikėjas</CustomTab>
      </TabList>
      <TabPanels>
        <TabPanel padding="0">
          <FormControl id="service">
            <FormLabel
              color="gray.500"
              fontWeight="600"
              fontSize="12px"
              position="absolute"
              top="10px"
              left="10%"
            >
              PASLAUGOS PAVADINIMAS
            </FormLabel>
            <Select
              icon={<></>}
              variant="outline"
              size="md"
              width="80%"
              ml="10%"
              mr="10%"
              border="none"
              borderRadius="0"
              borderBottom="1px solid #cbd5e0"
              mb="25px"
              focusBorderColor="gray.300"
              _focus={{ boxShadow: "none", borderBottom: "1px solid #cbd5e0" }}
              placeholder="Pasirinkite paslaugą"
              fontWeight="600"
              fontSize="16px"
              dir="rtl"
              height="2rem"
              _hover={{ cursor: "pointer", borderColor: "brand.500" }}
            >
              <option>Galios didinimas</option>
              <option>Langų tamsinimas</option>
            </Select>
          </FormControl>
          <FormControl id="area">
            <FormLabel
              color="gray.500"
              fontWeight="600"
              fontSize="12px"
              position="absolute"
              top="10px"
              left="10%"
            >
              MIESTAS
            </FormLabel>
            <Select
              icon={<></>}
              variant="outline"
              size="md"
              width="80%"
              ml="10%"
              mr="10%"
              border="none"
              borderRadius="0"
              borderBottom="1px solid #cbd5e0"
              mb="25px"
              focusBorderColor="gray.300"
              _focus={{ boxShadow: "none", borderBottom: "1px solid #cbd5e0" }}
              placeholder="Pasirinkite rajoną"
              fontWeight="600"
              fontSize="16px"
              dir="rtl"
              height="2rem"
              _hover={{ cursor: "pointer", borderColor: "brand.500" }}
            >
              <option>Klaipėda</option>
              <option>Vilnius</option>
            </Select>
          </FormControl>
          <FormControl id="date">
            <FormLabel
              color="gray.500"
              fontWeight="600"
              fontSize="12px"
              position="absolute"
              top="10px"
              left="10%"
            >
              DATA
            </FormLabel>
            <Box
              width="80%"
              ml="10%"
              mr="10%"
              borderBottom="1px solid #cbd5e0"
              fontWeight="600"
              fontSize="16px"
              dir="rtl"
              height="2rem"
              _hover={{ cursor: "pointer", borderColor: "brand.500" }}
              onClick={onOpen}
            >
              Pasirinkite datą
            </Box>
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Pasirinkite datą</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <DaySelector
                    type={DaySelectionTypes.Single}
                    onSelectedDays={(days) => console.log(days)}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button mr={3} onClick={onClose}>
                    Atšaukti
                  </Button>
                  <Button
                    backgroundColor="brand.500"
                    color="white"
                    _hover={{ backgroundColor: "brand.400" }}
                  >
                    Pasirinkti
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </FormControl>
        </TabPanel>
        <TabPanel padding="0">
          <FormControl id="serviceName">
            <FormLabel
              color="gray.500"
              fontWeight="600"
              fontSize="12px"
              position="absolute"
              top="10px"
              left="10%"
            >
              PAVADINIMAS
            </FormLabel>
            <Select
              icon={<></>}
              variant="outline"
              size="md"
              width="80%"
              ml="10%"
              mr="10%"
              border="none"
              borderRadius="0"
              borderBottom="1px solid #cbd5e0"
              mb="114px"
              focusBorderColor="gray.300"
              _focus={{ boxShadow: "none", borderBottom: "1px solid #cbd5e0" }}
              placeholder="Pasirinkite paslaugą"
              fontWeight="600"
              fontSize="16px"
              dir="rtl"
              height="2rem"
              _hover={{ cursor: "pointer", borderColor: "brand.500" }}
            >
              <option>Galios didinimas</option>
              <option>Langų tamsinimas</option>
            </Select>
          </FormControl>
        </TabPanel>
      </TabPanels>
    </ChakraTabs>
  )
}

export default Tabs
