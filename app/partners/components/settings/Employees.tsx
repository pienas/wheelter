import { useState, useRef, useEffect } from "react"
import { invoke, useQuery, useMutation } from "blitz"
import {
  Avatar,
  Input,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
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
  UnorderedList,
  ListItem,
  useToast,
  useDisclosure,
} from "@chakra-ui/react"
import getEmployees from "app/partners/queries/getEmployees"
import createEmployee from "app/partners/mutations/createEmployee"
import updateEmployee from "app/partners/mutations/updateEmployee"
import deleteEmployee from "app/partners/mutations/deleteEmployee"
import SuccessToast from "app/core/components/toast/SuccessToast"
import WarningToast from "app/core/components/toast/WarningToast"
import createInviteToken from "app/partners/mutations/createInviteToken"
import getServiceInviteTokens from "app/partners/queries/getServiceInviteTokens"
import createServiceLog from "app/partners/mutations/createServiceLog"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import moment from "moment"
import deleteServiceNotificationUpdate from "app/partners/mutations/deleteServiceNotificationUpdate"
import UserPlusIcon from "app/core/components/icons/UserPlusIcon"
import ChevronRightIcon from "app/core/components/icons/ChevronRightIcon"
import EditIcon from "app/core/components/icons/EditIcon"
import UserMinusIcon from "app/core/components/icons/UserMinusIcon"
import LockIcon from "app/core/components/icons/LockIcon"
import CopyIcon from "app/core/components/icons/CopyIcon"
import TimerIcon from "app/core/components/icons/TimerIcon"
import CommentQuestionIcon from "app/core/components/icons/CommentQuestionIcon"

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
  url: string
  plan: string
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

const Employees = ({ activeService, changing, onChanging, url, plan }: EmployeesProps) => {
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
            position: "bottom-left",
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
          position: "bottom-left",
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
  const [updatingEmployeeName, setUpdatingEmployeeName] = useState("")
  const [updatingEmployeeSurname, setUpdatingEmployeeSurname] = useState("")
  const [updatingEmployeePosition, setUpdatingEmployeePosition] = useState("")
  const onCreateEmployee = async () => {
    if (!employeeName.length || !employeePosition.length) {
      toastIdRef.current = toast({
        duration: 5000,
        position: "bottom-left",
        render: () => (
          <WarningToast
            heading="Kažkas netaip!"
            text={`Norėdami pridėti naują darbuotoją, užpildykite visus privalomus laukus.`}
            id={toastIdRef.current}
          />
        ),
      })
    } else {
      const createdEmployee = await createEmployee({
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
            text={
              <Text>
                Darbuotojas <b>{employeeName + " " + employeeSurname}</b> sėkmingai pridėtas.
              </Text>
            }
            id={toastIdRef.current}
          />
        ),
      })
      await createServiceLog({
        data: {
          carServiceId: activeService,
          updatedById: currentUser?.id,
          updatedWhat: `employee?action=create&id=${createdEmployee.id}&name=${employeeName}&surname=${employeeSurname}&position=${employeePosition}&carServiceId=${activeService}&carServiceUserId=undefined`,
        },
      })
      refetch()
      onClose()
      onResetValues()
    }
  }
  const onUpdateEmployee = async (employeeId, name, surname, position) => {
    if (!employeeName.length || !employeePosition.length) {
      toastIdRef.current = toast({
        duration: 5000,
        position: "bottom-left",
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
      await createServiceLog({
        data: {
          carServiceId: activeService,
          updatedById: currentUser?.id,
          updatedWhat: `employee?action=update&id=${employeeId}&oldName=${name}&oldSurname=${surname}&oldPosition=${position}&newName=${employeeName}&newSurname=${employeeSurname}&newPosition=${employeePosition}&carServiceId=${activeService}&carServiceUserId=${activeEmployee.carServiceUser?.id}`,
        },
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
    setUpdatingEmployeeName("")
    setUpdatingEmployeeSurname("")
    setUpdatingEmployeePosition("")
  }
  const [createInviteTokenMutation] = useMutation(createInviteToken)
  const [serviceInviteTokens] = useQuery(getServiceInviteTokens, {
    where: { carServiceId: activeService },
  })
  const [tokens, setTokens] = useState(serviceInviteTokens)
  const currentUser = useCurrentUser()
  const handleAddEmployeeClick = async () => {
    setIsCreatingNewEmployee(true)
    if (serviceInviteTokens.length === 0) {
      await createInviteTokenMutation(
        { id: activeService, userId: currentUser ? currentUser.id : 0 },
        {
          onSuccess: async () => {
            const newTokens = await invoke(getServiceInviteTokens, {
              where: { carServiceId: activeService },
            })
            setTokens(newTokens)
          },
        }
      )
    } else if (tokens[0].expiresAt.getTime() <= Date.now()) {
      await createInviteTokenMutation(
        { id: activeService, userId: currentUser ? currentUser.id : 0 },
        {
          onSuccess: async () => {
            const newTokens = await invoke(getServiceInviteTokens, {
              where: { carServiceId: activeService },
            })
            setTokens(newTokens)
          },
        }
      )
    }
    onOpen()
  }
  const { isOpen: isConfirmOpen, onOpen: onConfirmOpen, onClose: onConfirmClose } = useDisclosure()
  const [activeEmployee, setActiveEmployee] = useState(employees[0])
  const [countdown, setCountdown] = useState(
    tokens[0] ? tokens[0].expiresAt.getTime() - Date.now() : Date.now()
  )
  useEffect(() => {
    const interval = setInterval(
      () => setCountdown(tokens[0] ? tokens[0].expiresAt.getTime() - Date.now() : Date.now()),
      1000
    )
    return () => {
      clearInterval(interval)
    }
  }, [countdown])
  const [tooltipVisible, setTooltipVisible] = useState(false)
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
                  handleAddEmployeeClick()
                }}
              >
                <UserPlusIcon boxSize={5} transition="all 0.2s" mr="10px" />
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
          {employees
            .sort((a, b) => a.id - b.id)
            .map((employee) => {
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
                    <Flex alignItems="center">
                      {employee.carServiceUser?.avatarUrl && (
                        <Avatar
                          size="md"
                          name={
                            employee.carServiceUser?.name + " " + employee.carServiceUser?.surname
                          }
                          src={
                            employee.carServiceUser?.avatarUrl
                              ? employee.carServiceUser?.avatarUrl
                              : ""
                          }
                          mr="10px"
                        />
                      )}
                      <Text>
                        {employee.carServiceUser?.name
                          ? employee.carServiceUser?.name + " " + employee.carServiceUser?.surname
                          : employee.name + " " + employee.surname}
                      </Text>
                    </Flex>
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
                      <ChevronRightIcon
                        boxSize={4}
                        transition="all 0.2s"
                        ml="5px"
                        color="#6500E6"
                      />
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
                            setUpdatingEmployeeName(employee.name)
                            setUpdatingEmployeeSurname(employee.surname ? employee.surname : "")
                            setUpdatingEmployeePosition(employee.position)
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
                          <UserMinusIcon
                            boxSize={6}
                            transition="all 0.2s"
                            ml="15px"
                            cursor="pointer"
                            _hover={{ color: "brand.500" }}
                            onClick={() => {
                              setActiveEmployee(employee)
                              onConfirmOpen()
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
        size="xl"
        onEsc={onResetValues}
        onOverlayClick={onResetValues}
      >
        <ModalOverlay />
        <ModalContent>
          <Flex justifyContent="center" mt="20px">
            <UserPlusIcon boxSize={10} color="brand.500" />
          </Flex>
          <ModalHeader textAlign="center" fontWeight="500" fontSize="2xl">
            {isCreatingNewEmployee ? "Pridėti darbuotoją" : "Atnaujinti darbuotojo duomenis"}
            <Text color="text" fontWeight="400" fontSize="md" mt="10px">
              {isCreatingNewEmployee ? "Pridėti darbuotoją" : "Atnaujinti darbuotojo duomenis"}
            </Text>
          </ModalHeader>
          <ModalCloseButton onClick={onResetValues} />
          <Divider color="#d8d8d8" />
          <ModalBody>
            <Text color="text" fontWeight="400" fontSize="md" mb="12px">
              {isCreatingNewEmployee
                ? "Sukurkite darbuotojo profilį:"
                : "Atnaujinkite darbuotojo duomenis:"}
            </Text>
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
            {isCreatingNewEmployee && (
              <>
                <Text color="text" fontWeight="400" fontSize="md" mt="20px">
                  Arba pakvieskite darbuotoją su šia vienkartine nuoroda:
                </Text>
                <Flex
                  backgroundColor="#EFF0F3"
                  px="20px"
                  py="12px"
                  borderRadius="10px"
                  mt="10px"
                  position="relative"
                >
                  <LockIcon boxSize={6} color="brand.500" />
                  <Tooltip
                    label={
                      window.location.hostname +
                      "/partners/" +
                      url +
                      "?invite=" +
                      (tokens[0] !== undefined ? tokens[0].hashedToken : "")
                    }
                    placement="bottom"
                    background="#EFF0F3"
                    color="black"
                  >
                    <Text color="#787E97" ml="10px">
                      {window.location.hostname +
                        "/partners/" +
                        url +
                        "?invite=" +
                        (tokens[0] !== undefined ? tokens[0].hashedToken.substring(0, 8) : "") +
                        "..."}
                    </Text>
                  </Tooltip>
                  <CopyIcon
                    boxSize={6}
                    color="#787E97"
                    position="absolute"
                    right="20px"
                    _hover={{ color: "brand.500" }}
                    transition="all 0.2s"
                    cursor="pointer"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        window.location.hostname +
                          "/partners/" +
                          url +
                          "?invite=" +
                          (tokens[0] !== undefined ? tokens[0].hashedToken : "")
                      )
                      toastIdRef.current = toast({
                        position: "bottom-left",
                        duration: 5000,
                        render: () => (
                          <SuccessToast
                            heading="Pavyko!"
                            text={`Nuoroda buvo sėkmingai nukopijuota.`}
                            id={toastIdRef.current}
                          />
                        ),
                      })
                    }}
                  />
                </Flex>
                {countdown > 0 && (
                  <Text color="text" fontSize="xs" mt="5px">
                    <TimerIcon boxSize={4} mr={1} />
                    Ši nuoroda bus aktyvi dar{" "}
                    {moment(countdown - 3 * 60 * 60 * 1000).format("HH:mm:ss")}
                  </Text>
                )}
                {countdown <= 0 && (
                  <Text color="text" fontSize="xs" mt="5px">
                    <TimerIcon boxSize={4} mr={1} />
                    Ši nuoroda nebeaktyvi.{" "}
                    <Text
                      color="brand.500"
                      cursor="pointer"
                      display="inline"
                      onClick={async () => {
                        await createInviteTokenMutation(
                          { id: activeService, userId: currentUser ? currentUser.id : 0 },
                          {
                            onSuccess: async () => {
                              const newTokens = await invoke(getServiceInviteTokens, {
                                where: { carServiceId: activeService },
                              })
                              setTokens(newTokens)
                            },
                          }
                        )
                      }}
                    >
                      Sugeneruoti naują
                    </Text>
                  </Text>
                )}
              </>
            )}
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
              onClick={() => {
                onClose()
                onResetValues()
              }}
            >
              Atšaukti
            </Button>
            {isCreatingNewEmployee ? (
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
                onClick={onCreateEmployee}
              >
                Pridėti
              </Button>
            ) : (
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
                onClick={() => {
                  onUpdateEmployee(
                    updatingEmployeeId,
                    updatingEmployeeName,
                    updatingEmployeeSurname,
                    updatingEmployeePosition
                  )
                }}
              >
                Atnaujinti
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={isConfirmOpen} isCentered onClose={onConfirmClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <Flex justifyContent="center" mt="20px">
            <UserMinusIcon boxSize={10} color="brand.500" />
          </Flex>
          <ModalHeader textAlign="center" fontWeight="500" fontSize="2xl">
            Darbuotojo pašalinimas
            <Text color="text" fontWeight="400" fontSize="md" mt="10px">
              Ar tikrai norite pašalinti{" "}
              <b>
                {activeEmployee.carServiceUser?.name
                  ? activeEmployee.carServiceUser?.name +
                    " " +
                    activeEmployee.carServiceUser?.surname
                  : activeEmployee.name + " " + activeEmployee.surname}
              </b>{" "}
              iš darbuotojų sąrašo?
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <Divider color="#d8d8d8" />
          <ModalBody>
            <Text color="text" fontWeight="400" fontSize="md" mb="12px">
              Jei pašalinsite{" "}
              <b>
                {activeEmployee.carServiceUser?.name
                  ? activeEmployee.carServiceUser?.name +
                    " " +
                    activeEmployee.carServiceUser?.surname
                  : activeEmployee.name + " " + activeEmployee.surname}
              </b>{" "}
              iš darbuotojų sąrašo, darbuotojas nebegalės:
              <UnorderedList>
                <ListItem>Naudotis jam skirtomis privilegijomis;</ListItem>
                <ListItem>
                  Prisijungti prie šio serviso valdymo panelės ar kitaip sąveikauti su šio serviso
                  valdymu.
                </ListItem>
              </UnorderedList>
            </Text>
            <Text color="text" fontWeight="500" fontSize="md" mb="12px">
              Pašalinus darbuotoją pakeitimai įsigalios iš karto!
            </Text>
            {plan === "STANDARD" && (
              <Text color="text" fontWeight="400" fontSize="md" mb="12px" position="relative">
                Šis veiksmas su jūsų planu yra neanuliuojamas{" "}
                <CommentQuestionIcon
                  boxSize={4}
                  cursor="help"
                  onMouseEnter={() => setTooltipVisible(true)}
                  onMouseLeave={() => setTooltipVisible(false)}
                />
                <Box
                  background="#EFF0F3"
                  color="black"
                  borderRadius="10px"
                  position="absolute"
                  right="0"
                  py="15px"
                  px="20px"
                  maxW="300px"
                  zIndex="999"
                  visibility={tooltipVisible ? "visible" : "hidden"}
                  opacity={tooltipVisible ? 1 : 0}
                  transition="all 0.2s"
                >
                  <Heading size="sm">Ką tai reiškia?</Heading>
                  <Text mt="5px" fontSize="14px">
                    Su planu "Bazinis" veiksmas yra neanuliuojamas. Tai reiškia, kad pašalinus
                    darbuotoją:
                  </Text>
                  <UnorderedList fontSize="14px" mt="5px">
                    <ListItem mb="5px">Darbuotojo profilis dings visam laikui;</ListItem>
                    <ListItem mb="5px">
                      Visi darbai, kurie buvo priskirti darbuotojui, bus automatiškai atjungti nuo
                      šio darbuotojo;
                    </ListItem>
                    <ListItem mb="5px">Visa darbuotojo statistika bus pašalinta;</ListItem>
                    <ListItem>
                      Visų darbų, kurie buvo priskirti darbuotojui, kainos ir klientų palikti
                      įvertinimai bus išsaugoti.
                    </ListItem>
                  </UnorderedList>
                </Box>
                <br />
                <Link color="brand.500" fontWeight="400" fontSize="sm">
                  Pakeiskite planą, kad galėtumėte anuliuoti šį veiksmą
                </Link>
              </Text>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              background="#EFF0F3"
              _hover={{ background: "#E0E3EF" }}
              mr={3}
              onClick={async () => {
                await deleteServiceNotificationUpdate({
                  where: {
                    employeeId: activeEmployee.id,
                  },
                })
                await deleteEmployee({
                  where: {
                    id: activeEmployee.id,
                  },
                })
                toastIdRef.current = toast({
                  position: "bottom-left",
                  duration: 5000,
                  render: () => (
                    <SuccessToast
                      heading="Pavyko!"
                      text={
                        <Text>
                          Darbuotojas{" "}
                          <b>
                            {activeEmployee.carServiceUser?.name
                              ? activeEmployee.carServiceUser?.name +
                                " " +
                                activeEmployee.carServiceUser?.surname
                              : activeEmployee.name + " " + activeEmployee.surname}
                          </b>{" "}
                          sėkmingai pašalintas.
                        </Text>
                      }
                      id={toastIdRef.current}
                    />
                  ),
                })
                await createServiceLog({
                  data: {
                    carServiceId: activeService,
                    updatedById: currentUser?.id,
                    updatedWhat: `employee?action=delete&id=${activeEmployee.id}&name=${
                      activeEmployee.name
                    }&surname=${activeEmployee.surname}&position=${
                      activeEmployee.position
                    }&orders=${activeEmployee.orders
                      .map((order) => order.id)
                      .join()}&carServiceId=${activeService}&carServiceUserId=${
                      activeEmployee.carServiceUser?.id
                    }`,
                  },
                })
                refetch()
                onConfirmClose()
                setActiveEmployee(employees[0])
              }}
            >
              Patvirtinti
            </Button>
            <Button
              onClick={() => {
                onConfirmClose()
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
