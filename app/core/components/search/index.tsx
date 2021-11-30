import { useRef, useState } from "react"
import {
  Flex,
  Button,
  Text,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useToast,
  useDisclosure,
} from "@chakra-ui/react"
import PinIcon from "../icons/PinIcon"
import CalendarDatesIcon from "../icons/CalendarDatesIcon"
import Select from "react-select"
import locations from "./../locations.json"
import { format } from "date-fns"
import DaySelector from "../daySelector/DaySelector"
import { DaySelectionTypes } from "../daySelector/DaySelector"
import "react-day-picker/lib/style.css"
import SuccessToast from "../toast/SuccessToast"
import WarningToast from "../toast/WarningToast"
import CrossIcon from "../icons/CrossIcon"
import SearchIcon from "../icons/SearchIcon"
import WrenchIcon from "../icons/WrenchIcon"

const Search = () => {
  const services = [
    { value: "langutamsinimas", label: "Langų tamsinimas" },
    { value: "ratubalansavimas", label: "Ratų balansavimas" },
    { value: "kebulodazymas", label: "Kėbulo dažymas" },
  ]
  const customStyles = {
    container: (provided) => ({
      ...provided,
    }),
    control: (provided) => ({
      ...provided,
      border: "none",
      boxShadow: "none",
      minHeight: "0",
      cursor: "pointer",
      ":focus": { border: "none" },
      ":hover": { border: "none", boxShadow: "none" },
    }),
    placeholder: (provided) => ({
      ...provided,
      fontSize: "14px",
      color: "#4f5665",
      fontWeight: "500",
      margin: "0",
      transform: "translateY(0)",
      top: "0",
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: "0",
    }),
    indicatorsContainer: () => ({
      display: "none",
    }),
    input: (provided) => ({
      ...provided,
      margin: "0",
      padding: "0",
      input: {
        fontSize: "14px !important",
        color: "#4f5665 !important",
        fontWeight: "500 !important",
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      margin: "0",
      fontSize: "14px !important",
      color: "#4f5665 !important",
      fontWeight: "500 !important",
    }),
    option: (provided) => ({
      ...provided,
      padding: "0.3rem 0.8rem",
      color: "#4f5665",
      fontSize: "14px",
    }),
    menu: (provided) => ({
      ...provided,
      display: "block",
    }),
    menuList: (provided) => ({
      ...provided,
      display: "block",
    }),
  }
  const toast = useToast()
  const toastIdRef = useRef<any>()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedDays, setSelectedDays] = useState<Date[]>([new Date()])
  const [daySelectionType, setDaySelectionType] = useState(DaySelectionTypes.Single)
  const [finalDays, setFinalDays] = useState<Date[]>([])
  const submitRequest = async () => {
    try {
      toastIdRef.current = toast({
        position: "bottom-left",
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
        position: "bottom-left",
        render: () => (
          <WarningToast heading="Kažkas netaip!" text={error.message} id={toastIdRef.current} />
        ),
      })
    }
  }
  return (
    <Flex
      backgroundColor="#ffffff"
      boxShadow="0 0 30px 0 rgba(0, 0, 0, 10%)"
      borderRadius="10px"
      p="55px"
      mt="20px"
      position="relative"
    >
      <Box backgroundColor="green.400" borderRadius="full" position="absolute" top="-15px">
        <Flex alignItems="center" fontSize="sm" color="white" px="35px" py="5px">
          <SearchIcon boxSize={4} mr={2} color="white" /> Paieška
        </Flex>
      </Box>
      <Flex alignItems="center" width="sm">
        <PinIcon boxSize={8} color="brand.500" />
        <Box ml="20px" position="relative" width="80%">
          <Text fontSize="sm" color="#a0a0a0">
            Pasirinkite lokaciją
          </Text>
          <Select
            options={locations}
            styles={customStyles}
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary: "#E8E8E8",
                primary25: "#F8F8F8",
                primary50: "#F2F2F2",
                primary75: "#F2F2F2",
              },
            })}
            placeholder="Pasirinkite"
          />
        </Box>
      </Flex>
      <Box backgroundColor="brand.500" width="5px" borderRadius="full" opacity="0.5" mr="30px" />
      <Flex alignItems="center" width="sm">
        <CalendarDatesIcon boxSize={8} color="brand.500" />
        <Box ml="20px" width="80%">
          <Text fontSize="sm" color="#a0a0a0">
            Pasirinkite datą
          </Text>
          <Flex alignItems="center">
            <Text
              fontSize="sm"
              color="text"
              fontWeight="500"
              cursor="pointer"
              onClick={() => {
                onOpen()
                setSelectedDays(selectedDays)
              }}
            >
              {finalDays.length === undefined && "Pasirinktas intervalas"}
              {finalDays.length > 1 && "Pasirinktos kelios dienos"}
              {finalDays.length === 0 && "Pasirinkite"}
              {finalDays.length === 1 &&
                finalDays[0]?.toDateString() &&
                format(new Date(Date.parse(finalDays[0].toDateString())), "yyyy-MM-dd")}
            </Text>
            {finalDays.length === undefined && (
              <CrossIcon
                boxSize={4}
                ml={2}
                color="text"
                cursor="pointer"
                onClick={() => {
                  setSelectedDays([new Date()])
                  setFinalDays([])
                }}
              />
            )}
            {finalDays.length > 0 && (
              <CrossIcon
                boxSize={4}
                ml={2}
                color="text"
                cursor="pointer"
                onClick={() => {
                  setSelectedDays([new Date()])
                  setFinalDays([])
                }}
              />
            )}
          </Flex>
        </Box>
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          size={daySelectionType === DaySelectionTypes.Range ? "2xl" : "md"}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Pasirinkite datą</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <DaySelector
                type={DaySelectionTypes.Single}
                onSelectedDays={setSelectedDays}
                onDaySelectionTypeChanged={(type) => {
                  setSelectedDays([new Date()])
                  setDaySelectionType(type)
                }}
                finalDate={finalDays}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                variant="outline"
                color="text"
                width={24}
                height={10}
                fontSize="sm"
                borderRadius="10px"
                fontWeight="400"
                borderColor="#d8d8d8"
                mr={3}
                _hover={{ backgroundColor: "#f8f8f8" }}
                _focus={{ boxShadow: "none" }}
                onClick={onClose}
              >
                Atšaukti
              </Button>
              <Button
                variant="solid"
                color="white"
                width={24}
                height={10}
                fontSize="sm"
                borderRadius="10px"
                fontWeight="400"
                backgroundColor="brand.500"
                _hover={{ backgroundColor: "brand.400" }}
                _focus={{ boxShadow: "none" }}
                disabled={selectedDays.length === 0}
                onClick={submitRequest}
              >
                Pasirinkti
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
      <Box backgroundColor="brand.500" width="5px" borderRadius="full" opacity="0.5" mr="30px" />
      <Flex alignItems="center" width="sm">
        <WrenchIcon boxSize={8} color="brand.500" />
        <Box ml="20px" width="80%">
          <Text fontSize="sm" color="#a0a0a0">
            Pasirinkite paslaugą
          </Text>
          <Select
            options={services}
            styles={customStyles}
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary: "#E8E8E8",
                primary25: "#F8F8F8",
                primary50: "#F2F2F2",
                primary75: "#F2F2F2",
              },
            })}
            placeholder="Pasirinkite"
          />
        </Box>
      </Flex>
      <Box backgroundColor="brand.500" width="5px" borderRadius="full" opacity="0.5" mr="30px" />
      <Flex direction="column" width="sm" alignItems="center" justifyContent="center">
        <Button
          variant="solid"
          backgroundColor="brand.500"
          color="white"
          width={48}
          height={14}
          borderRadius="10px"
          fontWeight="600"
          boxShadow="0 5px 15px 0 rgb(100 0 230 / 30%)"
          _hover={{ backgroundColor: "brand.400" }}
        >
          Ieškoti
        </Button>
      </Flex>
    </Flex>
  )
}

export default Search
