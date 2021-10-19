import { useState, useRef } from "react"
import { useQuery } from "blitz"
import {
  Input,
  Button,
  Divider,
  Flex,
  Link,
  Text,
  Tooltip,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
  useDisclosure,
} from "@chakra-ui/react"
import EditIcon from "./../icons/EditIcon"
import DeleteIcon from "./../icons/DeleteIcon"
import AddIcon from "./../icons/AddIcon"
import getEmployees from "app/partners/queries/getEmployees"
import createEmployee from "app/partners/mutations/createEmployee"
import updateEmployee from "app/partners/mutations/updateEmployee"
import deleteEmployee from "app/partners/mutations/deleteEmployee"
import SuccessToast from "app/core/components/toast/SuccessToast"
import WarningToast from "app/core/components/toast/WarningToast"

type LineHeadingProps = {
  text: string
}

type EmployeeCreateInputProps = {
  placeholder: string
  value: string
  onChange: (e: any) => void
  required: boolean
  disabled: boolean
}

type EmployeesProps = {
  activeService: number
  changing: boolean
  onChanging: () => void
}

const LineHeading = ({ text }: LineHeadingProps) => {
  return (
    <Th textTransform="none" fontWeight="500" fontSize="md" letterSpacing="0" height="100px">
      {text}
    </Th>
  )
}

const EmployeeCreateInput = ({
  placeholder,
  value,
  onChange,
  required,
  disabled,
}: EmployeeCreateInputProps) => {
  return (
    <Input
      placeholder={placeholder}
      borderRadius="5px"
      borderWidth="1px"
      borderStyle="solid"
      borderColor="#E0E3EF"
      mb="20px"
      value={value}
      onChange={onChange}
      required={required}
      disabled={disabled}
    />
  )
}

const Employees = ({ activeService, changing, onChanging }: EmployeesProps) => {
  const toast = useToast()
  const toastIdRef = useRef<any>()
  const [employeeName, setEmployeeName] = useState("")
  const onEmployeeNameChange = (value) => {
    setEmployeeName(value)
  }
  const [employeeSurname, setEmployeeSurname] = useState("")
  const onEmployeeSurnameChange = (value) => {
    setEmployeeSurname(value)
  }
  const [employeePosition, setEmployeePosition] = useState("")
  const onEmployeePositionChange = (value) => {
    if (value.length) {
      var firstLetter = value[0]
      if (isNaN(firstLetter)) {
        if (firstLetter.toUpperCase() + value.substring(1) !== "Savininkas") {
          setEmployeePosition(value)
        } else {
          toastIdRef.current = toast({
            duration: 5000,
            render: () => (
              <WarningToast
                heading="Kažkas netaip!"
                text={`Pridėti papildomą savininką draudžiama. Jei norite pakeisti savininką, susisiekite su mumis per pagalbos centrą arba pagalba@wheelter.lt`}
                id={toastIdRef.current}
              />
            ),
          })
        }
      } else {
        toastIdRef.current = toast({
          duration: 5000,
          render: () => (
            <WarningToast
              heading="Kažkas netaip!"
              text={`Pareigos negali prasidėti skaitmeniu.`}
              id={toastIdRef.current}
            />
          ),
        })
      }
    } else {
      setEmployeePosition(value)
    }
  }
  const [employees, { refetch }] = useQuery(getEmployees, activeService)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isCreatingNewEmployee, setIsCreatingNewEmployee] = useState(false)
  const [updatingEmployeeId, setUpdatingEmployeeId] = useState(-1)
  const onCreateEmployee = async () => {
    if (!employeeName.length || !employeePosition.length) {
      toastIdRef.current = toast({
        duration: 5000,
        render: () => (
          <WarningToast
            heading="Kažkas netaip!"
            text={`Norėdami pridėti naują darbuotoją, užpildykite visus privalomus laukus.`}
            id={toastIdRef.current}
          />
        ),
      })
    } else {
      await createEmployee({
        data: {
          carServiceId: activeService,
          name: employeeName,
          surname: employeeSurname,
          position: employeePosition,
        },
      })
      toastIdRef.current = toast({
        position: "bottom-left",
        duration: 5000,
        render: () => (
          <SuccessToast
            heading="Pavyko!"
            text={`Darbuotojas sėkmingai pridėtas.`}
            id={toastIdRef.current}
          />
        ),
      })
      refetch()
      onClose()
      onResetValues()
    }
  }
  const onUpdateEmployee = async (employeeId) => {
    if (!employeeName.length || !employeePosition.length) {
      toastIdRef.current = toast({
        duration: 5000,
        render: () => (
          <WarningToast
            heading="Kažkas netaip!"
            text={`Norėdami pakeisti darbuotojo informaciją, užpildykite visus privalomus laukus.`}
            id={toastIdRef.current}
          />
        ),
      })
    } else {
      await updateEmployee({
        where: {
          id: employeeId,
        },
        data: {
          name: employeeName,
          surname: employeeSurname,
          position: employeePosition,
        },
      })
      toastIdRef.current = toast({
        position: "bottom-left",
        duration: 5000,
        render: () => (
          <SuccessToast
            heading="Pavyko!"
            text={`Darbuotojo informacija sėkmingai atnaujinta.`}
            id={toastIdRef.current}
          />
        ),
      })
      refetch()
      onClose()
      onResetValues()
    }
  }
  const onResetValues = () => {
    setEmployeeName("")
    setEmployeeSurname("")
    setEmployeePosition("")
    setIsCreatingNewEmployee(false)
    setUpdatingEmployeeId(-1)
  }
  return (
    <>
      <Divider color="#E0E3EF" mt="30px" width="100%" maxWidth="1920px" minWidth="1350px" />
      <Table variant="unstyled" width="100%" maxWidth="1920px" minWidth="1350px">
        <Thead>
          <Tr borderBottom="1px solid #E0E3EF">
            <LineHeading text="Darbuotojas" />
            <LineHeading text="Pareigos" />
            <LineHeading text="Atlikti darbai" />
            <LineHeading text="Uždirbta suma" />
            <LineHeading text="Įvertinimas" />
            <LineHeading text="Priskirti darbai" />
            <Th display="flex" justifyContent="flex-end" alignItems="center" height="100px">
              <Flex
                justifyContent="center"
                alignItems="center"
                background="#EFF0F3"
                borderRadius="5px"
                height="40px"
                px="15px"
                cursor="pointer"
                maxWidth="200px"
                sx={{
                  ":hover > svg": {
                    color: "brand.500",
                  },
                  ":hover > p": {
                    color: "brand.500",
                  },
                }}
                onClick={() => {
                  setIsCreatingNewEmployee(true)
                  onOpen()
                }}
              >
                <AddIcon boxSize={5} transition="all 0.2s" mr="10px" />
                <Text
                  fontWeight="500"
                  transition="all 0.2s"
                  textTransform="none"
                  fontSize="sm"
                  letterSpacing="0"
                >
                  Pridėti darbuotoją
                </Text>
              </Flex>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {employees.map((employee) => {
            var employeeProfit = 0
            var employeeRating = 0
            var employeeOrdersCount = 0
            employee.orders.forEach((order) => {
              employeeProfit += order.price
              if (order.review?.isReviewed) {
                employeeRating += order.review?.rating
                employeeOrdersCount++
              }
            })
            employeeRating /= employeeOrdersCount
            return (
              <Tr
                transition="all 0.2s"
                cursor="pointer"
                _hover={{
                  background: "white",
                  boxShadow: "0px 5px 20px 0px rgba(0, 0, 0, 0.03)",
                }}
                _notLast={{ borderBottom: "1px solid #E0E3EF" }}
                key={employee.id}
              >
                <Td height="100px">
                  <Text>
                    {employee.name} {employee.surname}
                  </Text>
                </Td>
                <Td height="100px">
                  <Text>{employee.position}</Text>
                </Td>
                <Td height="100px">
                  <Text>{employee.completedOrders}</Text>
                </Td>
                <Td height="100px">
                  <Text>{employeeProfit} €</Text>
                </Td>
                <Td height="100px">
                  <Text>{employeeRating > 0 ? employeeRating.toFixed(2) : "0.00"}</Text>
                </Td>
                <Td height="100px">
                  <Link
                    color="brand.500"
                    textDecoration="none !important"
                    _hover={{ color: "brand.200" }}
                    transition="all 0.2s"
                  >
                    Peržiūrėti darbus
                  </Link>
                </Td>
                <Td height="100px" textAlign="end">
                  <Tooltip
                    label="Atnaujinti darbuotojo duomenis"
                    placement="left"
                    background="#EFF0F3"
                    color="black"
                  >
                    <span>
                      <EditIcon
                        boxSize={6}
                        transition="all 0.2s"
                        cursor="pointer"
                        _hover={{ color: "brand.500" }}
                        onClick={() => {
                          setEmployeeName(employee.name)
                          setEmployeeSurname(employee.surname ? employee.surname : "")
                          setEmployeePosition(employee.position)
                          setIsCreatingNewEmployee(false)
                          setUpdatingEmployeeId(employee.id)
                          onOpen()
                        }}
                      />
                    </span>
                  </Tooltip>
                  {employee.position !== "Savininkas" && (
                    <Tooltip
                      label="Pašalinti darbuotoją"
                      placement="left"
                      background="#EFF0F3"
                      color="black"
                    >
                      <span>
                        <DeleteIcon
                          boxSize={6}
                          transition="all 0.2s"
                          ml="15px"
                          cursor="pointer"
                          _hover={{ color: "brand.500" }}
                          onClick={async () => {
                            await deleteEmployee({
                              where: {
                                id: employee.id,
                              },
                            })
                            toastIdRef.current = toast({
                              position: "bottom-left",
                              duration: 5000,
                              render: () => (
                                <SuccessToast
                                  heading="Pavyko!"
                                  text={`Darbuotojas sėkmingai pašalintas.`}
                                  id={toastIdRef.current}
                                />
                              ),
                            })
                            refetch()
                          }}
                        />
                      </span>
                    </Tooltip>
                  )}
                </Td>
              </Tr>
            )
          })}
        </Tbody>
      </Table>
      <Modal
        isOpen={isOpen}
        isCentered
        onClose={onClose}
        size="lg"
        onEsc={onResetValues}
        onOverlayClick={onResetValues}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {isCreatingNewEmployee ? "Pridėti darbuotoją" : "Atnaujinti darbuotojo duomenis"}
          </ModalHeader>
          <ModalCloseButton onClick={onResetValues} />
          <ModalBody>
            <EmployeeCreateInput
              placeholder="Vardas *"
              value={employeeName}
              onChange={(e) => onEmployeeNameChange(e.target.value)}
              required={true}
              disabled={false}
            />
            <EmployeeCreateInput
              placeholder="Pavardė"
              value={employeeSurname}
              onChange={(e) => onEmployeeSurnameChange(e.target.value)}
              required={false}
              disabled={false}
            />
            <EmployeeCreateInput
              placeholder="Pareigos *"
              value={employeePosition}
              onChange={(e) => onEmployeePositionChange(e.target.value)}
              required={true}
              disabled={employeePosition === "Savininkas"}
            />
          </ModalBody>
          <ModalFooter>
            {isCreatingNewEmployee ? (
              <Button
                background="#EFF0F3"
                _hover={{ background: "#E0E3EF" }}
                mr={3}
                onClick={onCreateEmployee}
              >
                Pridėti
              </Button>
            ) : (
              <Button
                background="#EFF0F3"
                _hover={{ background: "#E0E3EF" }}
                mr={3}
                onClick={() => {
                  onUpdateEmployee(updatingEmployeeId)
                }}
              >
                Atnaujinti
              </Button>
            )}
            <Button
              onClick={() => {
                onClose()
                onResetValues()
              }}
            >
              Atšaukti
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Divider color="#E0E3EF" mb="30px" width="100%" maxWidth="1920px" minWidth="1350px" />
      <Flex
        justifyContent="center"
        width="100%"
        maxWidth="1920px"
        minWidth="1400px"
        mb="70px"
        mt="30px"
      >
        <Button
          background="#EFF0F3"
          _hover={{ background: "#E0E3EF" }}
          isLoading={changing}
          width="200px"
          onClick={onChanging}
        >
          Tvirtinti pakeitimus
        </Button>
      </Flex>
    </>
  )
}

export default Employees
