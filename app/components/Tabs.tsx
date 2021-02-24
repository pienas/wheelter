import React, { useRef, useState } from "react"
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
  useToast,
} from "@chakra-ui/react"
import CustomTab from "./CustomTab"
import "react-day-picker/lib/style.css"
import DaySelector from "./DaySelector"
import { DaySelectionTypes } from "./DaySelector"
import SuccessToast from "./SuccessToast"
import WarningToast from "./WarningToast"
import { CloseIcon } from "@chakra-ui/icons"

const Tabs = () => {
  const toast = useToast()
  const toastIdRef = useRef()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedDays, setSelectedDays] = useState<Date[]>([new Date()])
  const [finalDays, setFinalDays] = useState<Date[]>([])
  const submitRequest = async () => {
    try {
      toastIdRef.current = toast({
        duration: 3000,
        render: () => (
          <SuccessToast
            heading="Pavyko!"
            text="Data buvo sėkmingai atnaujinta."
            id={toastIdRef.current}
          />
        ),
      })
      onClose()
      setFinalDays(selectedDays)
    } catch (error) {
      toastIdRef.current = toast({
        duration: 3000,
        render: () => (
          <WarningToast heading="Kažkas netaip!" text={error.message} id={toastIdRef.current} />
        ),
      })
    }
  }
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
              display="flex"
              alignItems="center"
              _hover={{ cursor: "pointer", borderColor: "brand.500" }}
              onClick={() => {
                onOpen()
                setSelectedDays(selectedDays)
              }}
            >
              {finalDays.length === undefined && "Pasirinktas intervalas"}
              {finalDays.length > 1 && "Pasirinktos kelios dienos"}
              {finalDays.length === 0 && "Pasirinkite datą"}
              {finalDays.length === 1 && finalDays.toLocaleString("lt").substring(0, 10)}
              {/* {selectedDays.length === 0 && "Pasirinkite datą"}
              {selectedDays.from &&
                `${selectedDays.to
                  .toLocaleString()
                  .substring(0, 10)} - ${selectedDays.from.toLocaleString().substring(0, 10)}`}
              {selectedDays.length > 1 && "Pasirinktos kelios dienos"}
              {selectedDays.length === 1 && selectedDays.toLocaleString().substring(0, 10)} */}
            </Box>
            {finalDays.length === undefined && (
              <CloseIcon
                boxSize={3}
                ml={2}
                color="gray.500"
                position="absolute"
                right="6.5%"
                top="35%"
                cursor="pointer"
                onClick={() => {
                  setSelectedDays([new Date()])
                  setFinalDays([])
                }}
              />
            )}
            {finalDays.length > 0 && (
              <CloseIcon
                boxSize={3}
                ml={2}
                color="gray.500"
                position="absolute"
                right="6.5%"
                top="35%"
                cursor="pointer"
                onClick={() => {
                  setSelectedDays([new Date()])
                  setFinalDays([])
                }}
              />
            )}
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Pasirinkite datą</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <DaySelector
                    type={DaySelectionTypes.Single}
                    onSelectedDays={setSelectedDays}
                    onDaySelectionTypeChanged={() => setSelectedDays([new Date()])}
                    finalDate={finalDays}
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
                    disabled={selectedDays.length === 0}
                    onClick={submitRequest}
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
