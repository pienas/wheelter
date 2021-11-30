import { FC, useRef, useState } from "react"
import {
  Box,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Divider,
  Flex,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useToast,
  useDisclosure,
} from "@chakra-ui/react"
import CalendarNoteIcon from "app/core/components/icons/CalendarNoteIcon"
import LoaderRecIcon from "app/core/components/icons/LoaderRecIcon"
import CheckRecIcon from "app/core/components/icons/CheckRecIcon"
import CrossRecIcon from "app/core/components/icons/CrossRecIcon"
import CustomTabOrders from "../customTab/CustomTabOrders"
import DaySelector, { DaySelectionTypes } from "app/core/components/daySelector/DaySelector"
import "react-day-picker/lib/style.css"
import SuccessToast from "app/core/components/toast/SuccessToast"
import WarningToast from "app/core/components/toast/WarningToast"
import MenuRecIcon from "app/core/components/icons/MenuRecIcon"
import OrdersTable from "./OrdersTable"

type Props = {
  isOpen: boolean
  activeService: number
  newOrders: number
  lateOrdersCount: number
}

const Orders: FC<Props> = ({ isOpen, activeService, newOrders, lateOrdersCount }: Props) => {
  const toast = useToast()
  const toastIdRef = useRef<any>()
  const {
    isOpen: isDatePickerOpen,
    onOpen: onDatePickerOpen,
    onClose: onDatePickerClose,
  } = useDisclosure()
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
      onDatePickerClose()
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
    <Box mr="70px" ml={isOpen ? "370px" : "170px"} transition="all 0.2s">
      <Heading as="h1">Užsakymai</Heading>
      <Box mt="30px">
        <Tabs variant="unstyled">
          <TabList width="100%" maxWidth="1920px" minWidth="1350px" justifyContent="space-between">
            <Flex>
              <CustomTabOrders
                icon={<CalendarNoteIcon boxSize={4} transition="all 0.2s" mr={2} color="#787E97" />}
              >
                Visi užsakymai
              </CustomTabOrders>
              <CustomTabOrders
                icon={<MenuRecIcon boxSize={4} transition="all 0.2s" mr={2} color="#787E97" />}
              >
                <Flex alignItems="center">
                  Nauji užsakymai
                  {newOrders > 0 && (
                    <Flex
                      justifyContent="center"
                      alignItems="center"
                      background="#FF5454"
                      width="18px"
                      height="18px"
                      borderRadius="100%"
                      transition="all 0.2s"
                      ml="5px"
                    >
                      <Text
                        color="#ffffff"
                        fontWeight="500"
                        fontSize="0.6rem"
                        transition="all 0.2s"
                      >
                        {newOrders > 9 ? "9+" : newOrders}
                      </Text>
                    </Flex>
                  )}
                </Flex>
              </CustomTabOrders>
              <CustomTabOrders
                icon={<LoaderRecIcon boxSize={4} transition="all 0.2s" mr={2} color="#787E97" />}
              >
                <Flex alignItems="center">
                  Aktyvūs užsakymai
                  {lateOrdersCount > 0 && (
                    <Flex
                      justifyContent="center"
                      alignItems="center"
                      background="#FF5454"
                      width="18px"
                      height="18px"
                      borderRadius="100%"
                      transition="all 0.2s"
                      ml="5px"
                    >
                      <Text
                        color="#ffffff"
                        fontWeight="500"
                        fontSize="0.6rem"
                        transition="all 0.2s"
                      >
                        {lateOrdersCount > 9 ? "9+" : lateOrdersCount}
                      </Text>
                    </Flex>
                  )}
                </Flex>
              </CustomTabOrders>
              <CustomTabOrders
                icon={<CheckRecIcon boxSize={4} transition="all 0.2s" mr={2} color="#787E97" />}
              >
                Atlikti užsakymai
              </CustomTabOrders>
              <CustomTabOrders
                icon={<CrossRecIcon boxSize={4} transition="all 0.2s" mr={2} color="#787E97" />}
              >
                Atmesti užsakymai
              </CustomTabOrders>
            </Flex>
            {/* <Flex
              alignItems="center"
              cursor="pointer"
              sx={{
                ":hover > svg": {
                  color: "black",
                },
                ":hover > p": {
                  color: "black",
                },
              }}
            >
              <CalendarDatesIcon boxSize={4} transition="all 0.2s" mr={2} color="#787E97" />
              <Text
                fontWeight="500"
                color="#787E97"
                transition="all 0.2s"
                onClick={() => {
                  onDatePickerOpen()
                  setSelectedDays(selectedDays)
                }}
              >
                {finalDays.length === undefined && "Pasirinktas intervalas"}
                {finalDays.length > 1 && "Pasirinktos kelios dienos"}
                {finalDays.length === 0 && "Pasirinkite pradžios datą"}
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
                  transition="all 0.2s"
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
                  transition="all 0.2s"
                  onClick={() => {
                    setSelectedDays([new Date()])
                    setFinalDays([])
                  }}
                />
              )}
            </Flex> */}
            {/* <Flex>
                  <Button
                    color="black"
                    backgroundColor="white"
                    fontSize="xs"
                    textTransform="uppercase"
                    borderRadius="0.375rem"
                    border="1px solid #E0E3EF"
                    _hover={{ backgroundColor: "#efefef" }}
                    transition="all 0.2s"
                  >
                    <PrinterIcon boxSize={4} color="black" mr="5px" /> Spausdinti
                  </Button>
              <Button
                color="black"
                backgroundColor="white"
                fontSize="xs"
                textTransform="uppercase"
                borderRadius="0.375rem"
                border="1px solid #E0E3EF"
                _hover={{ backgroundColor: "#efefef" }}
                transition="all 0.2s"
                ml="5px"
              >
                <FileDownloadIcon boxSize={4} color="black" mr="5px" /> Eksportuoti
              </Button>
            </Flex> */}
          </TabList>
          <TabPanels>
            <TabPanel padding="0" maxWidth="1920px" minWidth="1350px">
              <Divider
                color="#E0E3EF"
                mt="30px"
                mb="15px"
                width="100%"
                maxWidth="1920px"
                minWidth="1350px"
              />
              <OrdersTable activeService={activeService} />
            </TabPanel>
            <TabPanel padding="0">
              <Divider color="#E0E3EF" my="30px" width="100%" maxWidth="1920px" minWidth="1350px" />
            </TabPanel>
            <TabPanel padding="0">
              <Divider color="#E0E3EF" my="30px" width="100%" maxWidth="1920px" minWidth="1350px" />
            </TabPanel>
            <TabPanel padding="0">
              <Divider color="#E0E3EF" my="30px" width="100%" maxWidth="1920px" minWidth="1350px" />
            </TabPanel>
            <TabPanel padding="0">
              <Divider color="#E0E3EF" my="30px" width="100%" maxWidth="1920px" minWidth="1350px" />
            </TabPanel>
            <TabPanel padding="0">
              <Divider color="#E0E3EF" my="30px" width="100%" maxWidth="1920px" minWidth="1350px" />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
      <Modal
        isOpen={isDatePickerOpen}
        onClose={onDatePickerClose}
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
              onClick={onDatePickerClose}
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
    </Box>
  )
}

export default Orders
