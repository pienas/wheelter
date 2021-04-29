import { Head, Router, useMutation, useQuery } from "blitz"
import { Avatar } from "@chakra-ui/avatar"
import { useDisclosure } from "@chakra-ui/hooks"
import { Box, Divider, Flex, Heading, Link, Text } from "@chakra-ui/layout"
import { Menu, MenuButton, MenuDivider, MenuItem, MenuList } from "@chakra-ui/menu"
import getServiceOrdersCount from "app/partners/queries/getServiceOrdersCount"
import getUsersActiveService from "app/partners/queries/getUsersActiveService"
import getUsersServices from "app/partners/queries/getUsersServices"
import { useEffect, useRef, useState } from "react"
import QuickhelpIcon from "./QuickhelpIcon"
import CalendarIcon from "./CalendarIcon"
import StatsIcon from "./StatsIcon"
import ArrowIcon from "./ArrowIcon"
import SupportIcon from "./SupportIcon"
import DashboardIcon from "./DashboardIcon"
import Logo from "./Logo"
import OrdersIcon from "./OrdersIcon"
import ServicesIcon from "./ServicesIcon"
import SettingsIcon from "./SettingsIcon"
import ShareIcon from "./ShareIcon"
import InstructionsIcon from "./InstructionsIcon"
import useSound from "use-sound"
import MenuIcon from "./MenuIcon"
import NotificationsIcon from "./NotificationsIcon"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import Dashboard from "./Dashboard"
import Stats from "./Stats"
import Calendar from "./Calendar"
import Orders from "./Orders"
import Services from "./Services"
import Quickhelp from "./Quickhelp"
import Settings from "./Settings"
import NotesIcon from "./NotesIcon"
import Notes from "./Notes"
import { Tooltip } from "@chakra-ui/tooltip"
import { Button } from "@chakra-ui/button"
import { useToast } from "@chakra-ui/toast"
import SuccessToast from "../index/SuccessToast"
import updateServiceInfo from "app/partners/mutations/updateServiceInfo"
import getUserNotificationsCount from "app/partners/queries/getUserNotificationsCount"

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const name = currentUser?.name + " " + currentUser?.surname
  const [logoutMutation] = useMutation(logout)
  const avatarSrc = currentUser?.avatarUrl ? currentUser?.avatarUrl : ""
  return (
    <Menu>
      <MenuButton
        ml="30px"
        cursor="pointer"
        sx={{
          ":hover > span div p": {
            color: "#6500E6",
          },
          ":hover > span div svg": {
            color: "#6500E6",
          },
        }}
      >
        <Flex alignItems="center">
          <Avatar size="sm" name={name} src={avatarSrc} />
          <Text fontWeight="500" mx="10px" transition="all 0.2s">
            {name}
          </Text>
          <ArrowIcon boxSize={2} color="#4F5665" transition="all 0.2s" />
        </Flex>
      </MenuButton>
      <MenuList border="none" boxShadow="0px 0px 20px 0px rgba(0, 0, 0, 0.3)">
        <MenuItem _hover={{ background: "#F8F8F8" }}>Mano servisai</MenuItem>
        <MenuDivider color="#d8d8d8" />
        <MenuItem _hover={{ background: "#F8F8F8" }}>Naujienos</MenuItem>
        <MenuItem _hover={{ background: "#F8F8F8" }}>Nustatymai</MenuItem>
        <MenuItem
          _hover={{ background: "#F8F8F8" }}
          onClick={async () => {
            await logoutMutation()
          }}
        >
          Atsijungti
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

const DashboardMenu = () => {
  const currentUser = useCurrentUser()
  const [carServices] = useQuery(getUsersServices, null)
  const services = carServices!
  const selectedService = Router.query.activeService
    ? parseInt(Router.query.activeService as string)
    : parseInt(localStorage.getItem("selectedService") as string) || carServices![0].carServiceId
  const [activeService, setActiveService] = useState<number>(selectedService)
  const [activeCarService, { refetch }] = useQuery(getUsersActiveService, activeService)
  const { isOpen, onToggle } = useDisclosure({
    defaultIsOpen: ((Router.query.isOpen as string) === "true" ? true : false) ?? false,
  })
  const [newOrders] = useQuery(
    getServiceOrdersCount,
    {
      where: { carServiceId: activeService, status: "NEW" },
    },
    {
      refetchInterval: 60000,
    }
  )
  const [dateTime, setDateTime] = useState<any>()
  useEffect(() => {
    const id = setInterval(() => setDateTime(new Date()), 60000)
    return () => {
      clearInterval(id)
    }
  }, [])
  const [lateOrdersCount] = useQuery(
    getServiceOrdersCount,
    {
      where: { carServiceId: activeService, status: "ACTIVE", startsAt: { lte: dateTime } },
    },
    {
      refetchInterval: 60000,
    }
  )
  const [quickHelpOrders] = useQuery(
    getServiceOrdersCount,
    {
      where: { carServiceId: activeService, status: "QUICK" },
    },
    {
      refetchInterval: 60000,
    }
  )
  const [lastNotificationsCount, setLastNofiticationCount] = useState<any>()
  const [notificationSound] = useSound("/notification.mp3")
  const [notificationsCount] = useQuery(
    getUserNotificationsCount,
    {
      where: { carServiceUserId: currentUser?.id, seen: false },
    },
    {
      refetchInterval: 10000,
      refetchIntervalInBackground: true,
      onSuccess: (count) => {
        if (count > lastNotificationsCount) {
          notificationSound()
        }
        setLastNofiticationCount(count)
      },
    }
  )
  const toast = useToast()
  const toastIdRef = useRef<any>()
  const [buttonLoading, setButtonLoading] = useState(false)
  return (
    <>
      {Router.route === "/partners/dashboard" && (
        <Head>
          {notificationsCount ? (
            <title>
              ({notificationsCount > 9 ? "9+" : notificationsCount}) Suvestinė ・ Wheelter
            </title>
          ) : (
            <title>Suvestinė ・ Wheelter</title>
          )}
        </Head>
      )}
      {Router.route === "/partners/stats" && (
        <Head>
          {notificationsCount ? (
            <title>
              ({notificationsCount > 9 ? "9+" : notificationsCount}) Statistika ・ Wheelter
            </title>
          ) : (
            <title>Statistika ・ Wheelter</title>
          )}
        </Head>
      )}
      {Router.route === "/partners/calendar" && (
        <Head>
          {notificationsCount ? (
            <title>
              ({notificationsCount > 9 ? "9+" : notificationsCount}) Kalendorius ・ Wheelter
            </title>
          ) : (
            <title>Kalendorius ・ Wheelter</title>
          )}
        </Head>
      )}
      {Router.route === "/partners/orders" && (
        <Head>
          {notificationsCount ? (
            <title>
              ({notificationsCount > 9 ? "9+" : notificationsCount}) Užsakymai ・ Wheelter
            </title>
          ) : (
            <title>Užsakymai ・ Wheelter</title>
          )}
        </Head>
      )}
      {Router.route === "/partners/services" && (
        <Head>
          {notificationsCount ? (
            <title>
              ({notificationsCount > 9 ? "9+" : notificationsCount}) Paslaugos ・ Wheelter
            </title>
          ) : (
            <title>Paslaugos ・ Wheelter</title>
          )}
        </Head>
      )}
      {Router.route === "/partners/quickhelp" && (
        <Head>
          {notificationsCount ? (
            <title>
              ({notificationsCount > 9 ? "9+" : notificationsCount}) Greita pagalba ・ Wheelter
            </title>
          ) : (
            <title>Greita pagalba ・ Wheelter</title>
          )}
        </Head>
      )}
      {Router.route === "/partners/notes" && (
        <Head>
          {notificationsCount ? (
            <title>
              ({notificationsCount > 9 ? "9+" : notificationsCount}) Užrašinė ・ Wheelter
            </title>
          ) : (
            <title>Užrašinė ・ Wheelter</title>
          )}
        </Head>
      )}
      {Router.route === "/partners/settings" && (
        <Head>
          {notificationsCount ? (
            <title>
              ({notificationsCount > 9 ? "9+" : notificationsCount}) Nustatymai ・ Wheelter
            </title>
          ) : (
            <title>Nustatymai ・ Wheelter</title>
          )}
        </Head>
      )}
      {!activeCarService?.carService.isReviewed ? (
        <Flex
          alignItems="center"
          justifyContent="center"
          width="100vw"
          height="40px"
          background="brand.500"
          position="fixed"
          zIndex={12}
        >
          <Text fontSize="sm" color="white" fontWeight="500">
            {activeCarService?.carService.isUnderReview
              ? "Jūsų partnerio paskyra yra peržiūrima mūsų administratoriaus"
              : "Jūsų partnerio paskyra dar nepatvirtinta"}
          </Text>
          <Button
            disabled={activeCarService?.carService.isUnderReview}
            height="70%"
            fontWeight="500"
            fontSize="sm"
            borderRadius="0"
            background="brand.600"
            color="white"
            ml="20px"
            px="20px"
            isLoading={buttonLoading}
            _focus={{ boxShadow: "none" }}
            _hover={{ opacity: "0.8" }}
            onClick={async () => {
              setButtonLoading(true)
              await updateServiceInfo({
                where: {
                  id: activeService,
                },
                data: {
                  isUnderReview: true,
                },
              })
              setTimeout(() => {
                setButtonLoading(false)
                refetch()
                toastIdRef.current = toast({
                  duration: 5000,
                  render: () => (
                    <SuccessToast
                      heading="Pavyko!"
                      text={`Jūsų užklausa peržiūrėti jūsų partnerio paskyrą sėkmingai išsiųsta. Jūsų partnerio paskyrą per 24 valandas peržiūrės mūsų administratorius.`}
                      id={toastIdRef.current}
                    />
                  ),
                })
              }, 2000)
            }}
          >
            Prašyti patvirtinimo
          </Button>
        </Flex>
      ) : (
        !activeCarService?.carService.isActive && (
          <Flex
            alignItems="center"
            justifyContent="center"
            width="100vw"
            height="40px"
            background="brand.500"
            position="fixed"
            zIndex={12}
          >
            <Text fontSize="sm" color="white" fontWeight="500">
              Jūsų partnerio paskyra yra laikinai nematoma
            </Text>
            <Button
              height="70%"
              fontWeight="500"
              fontSize="sm"
              borderRadius="0"
              background="brand.600"
              color="white"
              ml="20px"
              px="20px"
              isLoading={buttonLoading}
              _focus={{ boxShadow: "none" }}
              _hover={{ opacity: "0.8" }}
              onClick={async () => {
                setButtonLoading(true)
                await updateServiceInfo({
                  where: {
                    id: activeService,
                  },
                  data: {
                    isActive: true,
                  },
                })
                setTimeout(() => {
                  setButtonLoading(false)
                  refetch()
                  toastIdRef.current = toast({
                    duration: 5000,
                    render: () => (
                      <SuccessToast
                        heading="Pavyko!"
                        text={`Jūsų partnerio paskyra vėl matoma klientams.`}
                        id={toastIdRef.current}
                      />
                    ),
                  })
                }, 2000)
              }}
            >
              Padaryti matomą
            </Button>
          </Flex>
        )
      )}
      <Flex width="100vw" minHeight="100vh">
        <Flex
          direction="column"
          background="white"
          height="100vh"
          minWidth={isOpen ? "300px" : "100px"}
          zIndex={13}
          transition="all 0.2s"
          position="fixed"
        >
          <Box
            height="41px"
            cursor="pointer"
            my="40px"
            ml={isOpen ? "70px" : "30px"}
            userSelect="none"
            transition="all 0.2s"
            width={isOpen ? "155px" : "40px"}
          >
            <Link href="/">
              <Flex alignItems="center">
                <Logo boxSize={10} transition="all 0.2s" />
                {isOpen && (
                  <Heading
                    as="h1"
                    fontWeight="500"
                    fontSize="1.65rem"
                    letterSpacing="-1px"
                    display="inline"
                    ml="10px"
                    transition="all 0.2s"
                  >
                    Wheelter
                  </Heading>
                )}
              </Flex>
            </Link>
          </Box>
          <Link href="/partners/dashboard" textDecoration="none !important">
            <Tooltip
              label="Suvestinė"
              placement="right"
              background="#EFF0F3"
              color="black"
              isDisabled={isOpen}
            >
              <Flex
                justifyContent="flex-start"
                alignItems="center"
                height="50px"
                cursor="pointer"
                transition="all 0.2s"
                background={Router.route === "/partners/dashboard" ? "#FDF9FF" : "transparent"}
                _hover={{ background: "#FDF9FF" }}
                sx={{
                  ":hover > svg": {
                    color: "#6500E6",
                  },
                  ":hover > p": {
                    color: "#0B132A",
                  },
                }}
                position="relative"
                _before={{
                  content: '""',
                  borderRadius: "0 50px 50px 0",
                  width: "6px",
                  height: "100%",
                  background: Router.route === "/partners/dashboard" ? "#6500E6" : "transparent",
                  position: "absolute",
                  left: "0",
                }}
              >
                <DashboardIcon
                  boxSize={7}
                  color={Router.route === "/partners/dashboard" ? "#6500E6" : "#A8A8A8"}
                  mr={isOpen ? "20px" : "0"}
                  ml={isOpen ? "70px" : "34px"}
                  transition="all 0.2s"
                />
                {isOpen && (
                  <Text
                    fontWeight="600"
                    fontSize="sm"
                    color={Router.route === "/partners/dashboard" ? "#0B132A" : "#A8A8A8"}
                    transition="all 0.2s"
                  >
                    Suvestinė
                  </Text>
                )}
              </Flex>
            </Tooltip>
          </Link>
          <Link href="/partners/stats" textDecoration="none !important">
            <Tooltip
              label="Statistika"
              placement="right"
              background="#EFF0F3"
              color="black"
              isDisabled={isOpen}
            >
              <Flex
                justifyContent="flex-start"
                alignItems="center"
                height="50px"
                cursor="pointer"
                transition="all 0.2s"
                background={Router.route === "/partners/stats" ? "#FDF9FF" : "transparent"}
                _hover={{ background: "#FDF9FF" }}
                sx={{
                  ":hover > svg": {
                    color: "#6500E6",
                  },
                  ":hover > p": {
                    color: "#0B132A",
                  },
                }}
                position="relative"
                _before={{
                  content: '""',
                  borderRadius: "0 50px 50px 0",
                  width: "6px",
                  height: "100%",
                  background: Router.route === "/partners/stats" ? "#6500E6" : "transparent",
                  position: "absolute",
                  left: "0",
                }}
              >
                <StatsIcon
                  boxSize={7}
                  color={Router.route === "/partners/stats" ? "#6500E6" : "#A8A8A8"}
                  mr={isOpen ? "20px" : "0"}
                  ml={isOpen ? "70px" : "34px"}
                  transition="all 0.2s"
                />
                {isOpen && (
                  <Text
                    fontWeight="600"
                    fontSize="sm"
                    color={Router.route === "/partners/stats" ? "#0B132A" : "#A8A8A8"}
                    transition="all 0.2s"
                  >
                    Statistika
                  </Text>
                )}
              </Flex>
            </Tooltip>
          </Link>
          <Link href="/partners/calendar" textDecoration="none !important">
            <Tooltip
              label="Kalendorius"
              placement="right"
              background="#EFF0F3"
              color="black"
              isDisabled={isOpen}
            >
              <Flex
                justifyContent="flex-start"
                alignItems="center"
                height="50px"
                cursor="pointer"
                transition="all 0.2s"
                background={Router.route === "/partners/calendar" ? "#FDF9FF" : "transparent"}
                _hover={{ background: "#FDF9FF" }}
                sx={{
                  ":hover > svg": {
                    color: "#6500E6",
                  },
                  ":hover > p": {
                    color: "#0B132A",
                  },
                }}
                position="relative"
                _before={{
                  content: '""',
                  borderRadius: "0 50px 50px 0",
                  width: "6px",
                  height: "100%",
                  background: Router.route === "/partners/calendar" ? "#6500E6" : "transparent",
                  position: "absolute",
                  left: "0",
                }}
              >
                <CalendarIcon
                  boxSize={7}
                  color={Router.route === "/partners/calendar" ? "#6500E6" : "#A8A8A8"}
                  mr={isOpen ? "20px" : "0"}
                  ml={isOpen ? "70px" : "34px"}
                  transition="all 0.2s"
                />
                {isOpen && (
                  <Text
                    fontWeight="600"
                    fontSize="sm"
                    color={Router.route === "/partners/calendar" ? "#0B132A" : "#A8A8A8"}
                    transition="all 0.2s"
                  >
                    Kalendorius
                  </Text>
                )}
              </Flex>
            </Tooltip>
          </Link>
          <Link href="/partners/orders" textDecoration="none !important">
            <Tooltip
              label="Užsakymai"
              placement="right"
              background="#EFF0F3"
              color="black"
              isDisabled={isOpen}
            >
              <Flex
                justifyContent="flex-start"
                alignItems="center"
                height="50px"
                cursor="pointer"
                transition="all 0.2s"
                background={Router.route === "/partners/orders" ? "#FDF9FF" : "transparent"}
                _hover={{ background: "#FDF9FF" }}
                sx={{
                  ":hover > svg": {
                    color: "#6500E6",
                  },
                  ":hover > p": {
                    color: "#0B132A",
                  },
                }}
                position="relative"
                _before={{
                  content: '""',
                  borderRadius: "0 50px 50px 0",
                  width: "6px",
                  height: "100%",
                  background: Router.route === "/partners/orders" ? "#6500E6" : "transparent",
                  position: "absolute",
                  left: "0",
                }}
              >
                <OrdersIcon
                  boxSize={7}
                  color={Router.route === "/partners/orders" ? "#6500E6" : "#A8A8A8"}
                  mr={isOpen ? "20px" : "0"}
                  ml={isOpen ? "70px" : "34px"}
                  transition="all 0.2s"
                />
                {isOpen && (
                  <Text
                    fontWeight="600"
                    fontSize="sm"
                    color={Router.route === "/partners/orders" ? "#0B132A" : "#A8A8A8"}
                    transition="all 0.2s"
                  >
                    Užsakymai
                  </Text>
                )}
                {(newOrders > 0 || lateOrdersCount > 0) && (
                  <Flex
                    justifyContent="center"
                    alignItems="center"
                    background="#FF5454"
                    width="18px"
                    height="18px"
                    borderRadius="100%"
                    ml={isOpen ? "10px" : "-15px"}
                    mt={isOpen ? "0" : "-15px"}
                    transition="all 0.2s"
                  >
                    <Text color="#ffffff" fontWeight="500" fontSize="0.6rem" transition="all 0.2s">
                      {newOrders + lateOrdersCount > 9 ? "9+" : newOrders + lateOrdersCount}
                    </Text>
                  </Flex>
                )}
              </Flex>
            </Tooltip>
          </Link>
          <Link href="/partners/services" textDecoration="none !important">
            <Tooltip
              label="Paslaugos"
              placement="right"
              background="#EFF0F3"
              color="black"
              isDisabled={isOpen}
            >
              <Flex
                justifyContent="flex-start"
                alignItems="center"
                height="50px"
                cursor="pointer"
                transition="all 0.2s"
                background={Router.route === "/partners/services" ? "#FDF9FF" : "transparent"}
                _hover={{ background: "#FDF9FF" }}
                sx={{
                  ":hover > svg": {
                    color: "#6500E6",
                  },
                  ":hover > p": {
                    color: "#0B132A",
                  },
                }}
                position="relative"
                _before={{
                  content: '""',
                  borderRadius: "0 50px 50px 0",
                  width: "6px",
                  height: "100%",
                  background: Router.route === "/partners/services" ? "#6500E6" : "transparent",
                  position: "absolute",
                  left: "0",
                }}
              >
                <ServicesIcon
                  boxSize={7}
                  color={Router.route === "/partners/services" ? "#6500E6" : "#A8A8A8"}
                  mr={isOpen ? "20px" : "0"}
                  ml={isOpen ? "70px" : "34px"}
                  transition="all 0.2s"
                />
                {isOpen && (
                  <Text
                    fontWeight="600"
                    fontSize="sm"
                    color={Router.route === "/partners/services" ? "#0B132A" : "#A8A8A8"}
                    transition="all 0.2s"
                  >
                    Paslaugos
                  </Text>
                )}
              </Flex>
            </Tooltip>
          </Link>
          <Link href="/partners/quickhelp" textDecoration="none !important">
            <Tooltip
              label="Greita pagalba"
              placement="right"
              background="#EFF0F3"
              color="black"
              isDisabled={isOpen}
            >
              <Flex
                justifyContent="flex-start"
                alignItems="center"
                height="50px"
                cursor="pointer"
                transition="all 0.2s"
                background={Router.route === "/partners/quickhelp" ? "#FDF9FF" : "transparent"}
                _hover={{ background: "#FDF9FF" }}
                sx={{
                  ":hover > svg": {
                    color: "#6500E6",
                  },
                  ":hover > p": {
                    color: "#0B132A",
                  },
                }}
                position="relative"
                _before={{
                  content: '""',
                  borderRadius: "0 50px 50px 0",
                  width: "6px",
                  height: "100%",
                  background: Router.route === "/partners/quickhelp" ? "#6500E6" : "transparent",
                  position: "absolute",
                  left: "0",
                }}
              >
                <QuickhelpIcon
                  boxSize={7}
                  color={Router.route === "/partners/quickhelp" ? "#6500E6" : "#A8A8A8"}
                  mr={isOpen ? "20px" : "0"}
                  ml={isOpen ? "70px" : "34px"}
                  transition="all 0.2s"
                />
                {isOpen && (
                  <Text
                    fontWeight="600"
                    fontSize="sm"
                    color={Router.route === "/partners/quickhelp" ? "#0B132A" : "#A8A8A8"}
                    transition="all 0.2s"
                    whiteSpace="nowrap"
                  >
                    Greita pagalba
                  </Text>
                )}
                {quickHelpOrders > 0 && (
                  <Flex
                    justifyContent="center"
                    alignItems="center"
                    background="#FF5454"
                    width="18px"
                    height="18px"
                    borderRadius="100%"
                    ml={isOpen ? "10px" : "-15px"}
                    mt={isOpen ? "0" : "-15px"}
                    transition="all 0.2s"
                  >
                    <Text color="#ffffff" fontWeight="500" fontSize="0.6rem" transition="all 0.2s">
                      {quickHelpOrders > 9 ? "9+" : quickHelpOrders}
                    </Text>
                  </Flex>
                )}
              </Flex>
            </Tooltip>
          </Link>
          <Link href="/partners/notes" textDecoration="none !important">
            <Tooltip
              label="Užrašinė"
              placement="right"
              background="#EFF0F3"
              color="black"
              isDisabled={isOpen}
            >
              <Flex
                justifyContent="flex-start"
                alignItems="center"
                height="50px"
                cursor="pointer"
                transition="all 0.2s"
                background={Router.route === "/partners/notes" ? "#FDF9FF" : "transparent"}
                _hover={{ background: "#FDF9FF" }}
                sx={{
                  ":hover > svg": {
                    color: "#6500E6",
                  },
                  ":hover > p": {
                    color: "#0B132A",
                  },
                }}
                position="relative"
                _before={{
                  content: '""',
                  borderRadius: "0 50px 50px 0",
                  width: "6px",
                  height: "100%",
                  background: Router.route === "/partners/notes" ? "#6500E6" : "transparent",
                  position: "absolute",
                  left: "0",
                }}
              >
                <NotesIcon
                  boxSize={7}
                  color={Router.route === "/partners/notes" ? "#6500E6" : "#A8A8A8"}
                  mr={isOpen ? "20px" : "0"}
                  ml={isOpen ? "70px" : "34px"}
                  transition="all 0.2s"
                />
                {isOpen && (
                  <Text
                    fontWeight="600"
                    fontSize="sm"
                    color={Router.route === "/partners/notes" ? "#0B132A" : "#A8A8A8"}
                    transition="all 0.2s"
                    whiteSpace="nowrap"
                  >
                    Užrašinė
                  </Text>
                )}
              </Flex>
            </Tooltip>
          </Link>
          <Link href="/partners/settings" textDecoration="none !important">
            <Tooltip
              label="Nustatymai"
              placement="right"
              background="#EFF0F3"
              color="black"
              isDisabled={isOpen}
            >
              <Flex
                justifyContent="flex-start"
                alignItems="center"
                height="50px"
                cursor="pointer"
                transition="all 0.2s"
                background={Router.route === "/partners/settings" ? "#FDF9FF" : "transparent"}
                _hover={{ background: "#FDF9FF" }}
                sx={{
                  ":hover > svg": {
                    color: "#6500E6",
                  },
                  ":hover > p": {
                    color: "#0B132A",
                  },
                }}
                position="relative"
                _before={{
                  content: '""',
                  borderRadius: "0 50px 50px 0",
                  width: "6px",
                  height: "100%",
                  background: Router.route === "/partners/settings" ? "#6500E6" : "transparent",
                  position: "absolute",
                  left: "0",
                }}
              >
                <SettingsIcon
                  boxSize={7}
                  color={Router.route === "/partners/settings" ? "#6500E6" : "#A8A8A8"}
                  mr={isOpen ? "20px" : "0"}
                  ml={isOpen ? "70px" : "34px"}
                  transition="all 0.2s"
                />
                {isOpen && (
                  <Text
                    fontWeight="600"
                    fontSize="sm"
                    color={Router.route === "/partners/settings" ? "#0B132A" : "#A8A8A8"}
                    transition="all 0.2s"
                  >
                    Nustatymai
                  </Text>
                )}
              </Flex>
            </Tooltip>
          </Link>
          <Tooltip
            label="Dalintis"
            placement="right"
            background="#EFF0F3"
            color="black"
            isDisabled={isOpen}
          >
            <Flex
              justifyContent="flex-start"
              alignItems="center"
              height="50px"
              cursor="pointer"
              transition="all 0.2s"
              _hover={{ background: "#FDF9FF" }}
              sx={{
                ":hover > svg": {
                  color: "#6500E6",
                },
                ":hover > p": {
                  color: "#0B132A",
                },
              }}
            >
              <ShareIcon
                boxSize={7}
                color="#A8A8A8"
                mr={isOpen ? "20px" : "0"}
                ml={isOpen ? "70px" : "34px"}
                transition="all 0.2s"
              />
              {isOpen && (
                <Text fontWeight="600" fontSize="sm" color="#A8A8A8" transition="all 0.2s">
                  Dalintis
                </Text>
              )}
            </Flex>
          </Tooltip>
          <Text
            fontWeight="600"
            fontSize="xs"
            color="#A8A8A8"
            ml={isOpen ? "-150px" : "0"}
            textAlign="center"
            mt="30px"
            transition="all 0.2s"
          >
            PAGALBA
          </Text>
          <Tooltip
            label="Instrukcija"
            placement="right"
            background="#EFF0F3"
            color="black"
            isDisabled={isOpen}
          >
            <Flex
              justifyContent="flex-start"
              alignItems="center"
              height="50px"
              cursor="pointer"
              transition="all 0.2s"
              _hover={{ background: "#FDF9FF" }}
              sx={{
                ":hover > svg": {
                  color: "#6500E6",
                },
                ":hover > p": {
                  color: "#0B132A",
                },
              }}
            >
              <InstructionsIcon
                boxSize={7}
                color="#A8A8A8"
                mr={isOpen ? "20px" : "0"}
                ml={isOpen ? "70px" : "34px"}
                transition="all 0.2s"
              />
              {isOpen && (
                <Text fontWeight="600" fontSize="sm" color="#A8A8A8" transition="all 0.2s">
                  Instrukcija
                </Text>
              )}
            </Flex>
          </Tooltip>
          <Tooltip
            label="Pagalbos centras"
            placement="right"
            background="#EFF0F3"
            color="black"
            isDisabled={isOpen}
          >
            <Flex
              justifyContent="flex-start"
              alignItems="center"
              height="50px"
              cursor="pointer"
              transition="all 0.2s"
              _hover={{ background: "#FDF9FF" }}
              sx={{
                ":hover > svg": {
                  color: "#6500E6",
                },
                ":hover > p": {
                  color: "#0B132A",
                },
              }}
            >
              <SupportIcon
                boxSize={7}
                color="#A8A8A8"
                mr={isOpen ? "20px" : "0"}
                ml={isOpen ? "70px" : "34px"}
                transition="all 0.2s"
              />
              {isOpen && (
                <Text
                  fontWeight="600"
                  fontSize="sm"
                  color="#A8A8A8"
                  transition="all 0.2s"
                  whiteSpace="nowrap"
                >
                  Pagalbos centras
                </Text>
              )}
            </Flex>
          </Tooltip>
          <Box position="absolute" bottom="0" width="100%">
            <Menu placement="top">
              <MenuButton
                width="100%"
                cursor="pointer"
                _hover={{ background: "#FDF9FF" }}
                sx={{
                  ":hover > span div div h5": {
                    color: "#6500E6",
                  },
                  ":hover > span div svg": {
                    color: "#6500E6",
                  },
                }}
              >
                <Flex alignItems="center" justifyContent="center" height="50px">
                  <Avatar
                    size="sm"
                    name={activeCarService?.carService.name}
                    src={activeCarService?.carService.avatarUrl!}
                    border="2px solid #6500E6"
                    transition="all 0.2s"
                  />
                  {isOpen && (
                    <Flex flexDirection="column" ml="15px" transition="all 0.2s">
                      <Heading
                        as="h5"
                        fontSize="sm"
                        fontWeight="600"
                        color="#4F5665"
                        textAlign="center"
                        transition="all 0.2s"
                        whiteSpace="nowrap"
                      >
                        {activeCarService?.carService.name}
                      </Heading>
                      <Text
                        fontWeight="400"
                        color="#A8A8A8"
                        textAlign="center"
                        fontSize="xs"
                        whiteSpace="nowrap"
                        transition="all 0.2s"
                      >
                        {activeCarService?.userRole}
                      </Text>
                    </Flex>
                  )}
                  <ArrowIcon boxSize={2} color="#4F5665" ml="10px" transition="all 0.2s" />
                </Flex>
              </MenuButton>
              <MenuList
                border="none"
                boxShadow="0px 0px 20px 0px rgba(0, 0, 0, 0.3)"
                width="auto"
                minWidth="none"
              >
                {services.map((service) => {
                  if (service?.carServiceId !== activeService) {
                    return (
                      <Tooltip
                        label={service?.carService.name}
                        placement="right"
                        background="#EFF0F3"
                        color="black"
                        isDisabled={isOpen}
                        key={service?.carServiceId}
                      >
                        <MenuItem
                          _hover={{ background: "#F8F8F8" }}
                          key={service?.carServiceId}
                          onClick={() => {
                            localStorage.setItem(
                              "selectedService",
                              service?.carServiceId.toString()
                            )
                            setActiveService(service?.carServiceId)
                            setLastNofiticationCount(undefined)
                            Router.reload()
                          }}
                        >
                          <Avatar
                            size="sm"
                            name={service?.carService.name}
                            src={service?.carService.avatarUrl!}
                            border="2px solid #6500E6"
                            transition="all 0.2s"
                          />
                          {isOpen && (
                            <Flex
                              flexDirection="column"
                              ml="15px"
                              transition="all 0.2s"
                              width="100%"
                              alignItems="center"
                            >
                              <Heading
                                as="h5"
                                fontSize="sm"
                                fontWeight="600"
                                color="#4F5665"
                                textAlign="center"
                                transition="all 0.2s"
                                whiteSpace="nowrap"
                              >
                                {service?.carService.name}
                              </Heading>
                              <Text
                                fontWeight="400"
                                color="#A8A8A8"
                                textAlign="center"
                                fontSize="xs"
                                whiteSpace="nowrap"
                                transition="all 0.2s"
                              >
                                {service?.userRole}
                              </Text>
                            </Flex>
                          )}
                        </MenuItem>
                      </Tooltip>
                    )
                  }
                })}
                <Tooltip
                  label="Naujas servisas"
                  placement="right"
                  background="#EFF0F3"
                  color="black"
                  isDisabled={isOpen}
                >
                  <MenuItem
                    _hover={{ background: "#F8F8F8" }}
                    key="new"
                    onClick={() => {
                      console.log("create new car service")
                    }}
                  >
                    <Avatar size="sm" name="+" bg="#d8d8d8" transition="all 0.2s" color="black" />
                    {isOpen && (
                      <Flex
                        flexDirection="column"
                        ml="15px"
                        transition="all 0.2s"
                        width="100%"
                        alignItems="center"
                      >
                        <Heading
                          as="h5"
                          fontSize="sm"
                          fontWeight="600"
                          color="#4F5665"
                          textAlign="center"
                          transition="all 0.2s"
                          whiteSpace="nowrap"
                        >
                          Sukurti naują servisą
                        </Heading>
                      </Flex>
                    )}
                  </MenuItem>
                </Tooltip>
              </MenuList>
            </Menu>
            <Divider borderColor="#EFEFEF" mb="20px" />
            <Text color="#4F5665" textAlign="center" fontSize="sm" mb="5px">
              Versija 1.0
            </Text>
            <Text color="#A8A8A8" textAlign="center" fontSize="0.675rem">
              Wheelter @ 2021.
            </Text>
            <Text color="#A8A8A8" textAlign="center" fontSize="0.675rem" mb="20px">
              Visos teisės saugomos.
            </Text>
          </Box>
        </Flex>
        <Box
          background="#F8F8F8"
          minHeight="100vh"
          width="100%"
          mt={
            !activeCarService?.carService.isReviewed || !activeCarService?.carService.isActive
              ? "40px"
              : 0
          }
        >
          <Flex
            mt="50px"
            mb="30px"
            mr="70px"
            ml={isOpen ? "370px" : "170px"}
            transition="all 0.2s"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box
              top="50px"
              zIndex={11}
              cursor="pointer"
              transition="all 0.4s"
              sx={{
                ":hover > svg": {
                  color: "#6500E6",
                },
              }}
              justifySelf="flex-start"
            >
              <MenuIcon boxSize={6} color="black" transition="all 0.2s" onClick={onToggle} />
            </Box>
            <Flex alignItems="center">
              <Flex
                cursor="pointer"
                sx={{
                  ":hover > svg": {
                    color: "#6500E6",
                  },
                }}
              >
                <NotificationsIcon boxSize={8} color="#0B132A" transition="all 0.2s" />
                {notificationsCount > 0 && (
                  <Flex
                    justifyContent="center"
                    alignItems="center"
                    background="#FF5454"
                    width="18px"
                    height="18px"
                    borderRadius="100%"
                    ml="-15px"
                    transition="all 0.2s"
                  >
                    <Text color="#ffffff" fontWeight="500" fontSize="0.6rem" transition="all 0.2s">
                      {notificationsCount > 9 ? "9+" : notificationsCount}
                    </Text>
                  </Flex>
                )}
              </Flex>
              <UserInfo />
            </Flex>
          </Flex>
          {Router.route === "/partners/dashboard" && (
            <Dashboard
              isOpen={isOpen}
              activeService={activeService}
              activeCarServiceIncome={activeCarService!.carService.income}
              newOrders={newOrders}
            />
          )}
          {Router.route === "/partners/stats" && (
            <Stats isOpen={isOpen} activeService={activeService} />
          )}
          {Router.route === "/partners/calendar" && (
            <Calendar isOpen={isOpen} activeService={activeService} />
          )}
          {Router.route === "/partners/orders" && (
            <Orders isOpen={isOpen} activeService={activeService} />
          )}
          {Router.route === "/partners/services" && (
            <Services isOpen={isOpen} activeService={activeService} />
          )}
          {Router.route === "/partners/quickhelp" && (
            <Quickhelp isOpen={isOpen} activeService={activeService} />
          )}
          {Router.route === "/partners/notes" && (
            <Notes isOpen={isOpen} activeService={activeService} />
          )}
          {Router.route === "/partners/settings" && (
            <Settings
              isMenuOpen={isOpen}
              activeService={activeService}
              avatarUrl={activeCarService?.carService.avatarUrl!}
              url={activeCarService?.carService.url!}
              name={activeCarService?.carService.name!}
              description={activeCarService?.carService.description!}
              plan={activeCarService?.carService.plan!}
              refetchOther={() => refetch()}
            />
          )}
        </Box>
      </Flex>
    </>
  )
}

export default DashboardMenu
