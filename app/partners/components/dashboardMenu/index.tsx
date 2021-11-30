import { Head, Router, useMutation, useQuery } from "blitz"
import {
  Avatar,
  Box,
  Divider,
  Flex,
  Circle,
  Center,
  Heading,
  Link,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  ModalCloseButton,
  Tooltip,
  Button,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  useDisclosure,
  useToast,
  useOutsideClick,
} from "@chakra-ui/react"
import getServiceOrdersCount from "app/partners/queries/getServiceOrdersCount"
import getUsersActiveService from "app/partners/queries/getUsersActiveService"
import getUsersServices from "app/partners/queries/getUsersServices"
import { useEffect, useRef, useState } from "react"
import Logo from "./../Logo"
import useSound from "use-sound"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import Dashboard from "./../dashboard"
import Stats from "./../stats"
import Calendar from "./../calendar"
import Orders from "./../orders"
import Services from "./../services"
import Settings from "./../settings"
import Logs from "../logsJournal"
import SuccessToast from "app/core/components/toast/SuccessToast"
import updateServiceInfo from "app/partners/mutations/updateServiceInfo"
import getServiceAddress from "app/partners/queries/getServiceAddress"
import Discounts from "./../discounts"
import CustomTabNotifications from "../customTab/CustomTabNotifications"
import moment from "moment"
import "moment/locale/lt"
import updateUserOrderNotification from "app/partners/mutations/updateUserOrderNotification"
import updateUserUpdateNotification from "app/partners/mutations/updateUserUpdateNotification"
import { Scrollbars } from "react-custom-scrollbars"
import { NotificationOrder, NotificationUpdate } from "db"
import getUserOrderNotifications from "app/partners/queries/getUserOrderNotifications"
import getUserUpdateNotifications from "app/partners/queries/getUserUpdateNotifications"
import CalendarDatesIcon from "app/core/components/icons/CalendarDatesIcon"
import FolderIcon from "app/core/components/icons/FolderIcon"
import MegaphoneIcon from "app/core/components/icons/MegaphoneIcon"
import GearIcon from "app/core/components/icons/GearIcon"
import LogOutIcon from "app/core/components/icons/LogOutIcon"
import HomeIcon from "app/core/components/icons/HomeIcon"
import ActivityIcon from "app/core/components/icons/ActivityIcon"
import CalendarNoteIcon from "app/core/components/icons/CalendarNoteIcon"
import BoxIcon from "app/core/components/icons/BoxIcon"
import ProcentCircleIcon from "app/core/components/icons/ProcentCircleIcon"
import MenuRecIcon from "app/core/components/icons/MenuRecIcon"
import SendIcon from "app/core/components/icons/SendIcon"
import BookOpenIcon from "app/core/components/icons/BookOpenIcon"
import HeadphonesIcon from "app/core/components/icons/HeadphonesIcon"
import ChevronDownIcon from "app/core/components/icons/ChevronDownIcon"
import FolderPlusIcon from "app/core/components/icons/FolderPlusIcon"
import MenuIcon from "app/core/components/icons/MenuIcon"
import LockIcon from "app/core/components/icons/LockIcon"
import CopyIcon from "app/core/components/icons/CopyIcon"
import BellIcon from "app/core/components/icons/BellIcon"
import RefreshIcon from "app/core/components/icons/RefreshIcon"
import EyeIcon from "app/core/components/icons/EyeIcon"
import EyeSlashIcon from "app/core/components/icons/EyeSlashIcon"
import FacebookIcon from "app/core/components/icons/FacebookIcon"
import InstagramIcon from "app/core/components/icons/InstagramIcon"

type MenuLinkProps = {
  isOpen: boolean
  url: string
  label: string
  icon: React.ReactNode
  isOrders: boolean
  newOrders?: number
  lateOrdersCount?: number
}

type IconProps = {
  icon: React.ReactNode
}

const Icon = ({ icon }: IconProps) => {
  return (
    <Box
      backgroundColor="white"
      borderRadius="100%"
      p="0.4rem"
      boxShadow="0px 0px 10px 0px rgba(0, 0, 0, 0.12);"
      cursor="pointer"
      color="brand.500"
      _hover={{ backgroundColor: "brand.500", color: "white" }}
      mr={4}
      transition="all 0.2s"
    >
      {icon}
    </Box>
  )
}

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
          <ChevronDownIcon boxSize={4} color="#4F5665" transition="all 0.2s" />
        </Flex>
      </MenuButton>
      <MenuList border="none" boxShadow="0px 0px 20px 0px rgba(0, 0, 0, 0.3)">
        <MenuItem fontSize="sm" color="text" py="0.3rem" _hover={{ background: "#F8F8F8" }}>
          <FolderIcon boxSize={3} color="text" mr={2} />
          Mano servisai
        </MenuItem>
        <MenuDivider color="#d8d8d8" />
        <MenuItem fontSize="sm" color="text" py="0.3rem" _hover={{ background: "#F8F8F8" }}>
          <MegaphoneIcon boxSize={3} color="text" mr={2} /> Naujienos
        </MenuItem>
        <MenuItem fontSize="sm" color="text" py="0.3rem" _hover={{ background: "#F8F8F8" }}>
          <GearIcon boxSize={3} color="text" mr={2} />
          Nustatymai
        </MenuItem>
        <MenuItem
          fontSize="sm"
          color="text"
          py="0.3rem"
          _hover={{ background: "#F8F8F8" }}
          onClick={async () => {
            await logoutMutation()
          }}
        >
          <LogOutIcon boxSize={3} color="text" mr={2} />
          Atsijungti
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

const MenuLink = ({
  isOpen,
  url,
  label,
  icon,
  isOrders,
  newOrders,
  lateOrdersCount,
}: MenuLinkProps) => {
  return (
    <Link href={`/partners/${url}`} textDecoration="none !important">
      <Tooltip
        label={label}
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
          background={Router.route === `/partners/${url}` ? "#FDF9FF" : "transparent"}
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
            background: Router.route === `/partners/${url}` ? "#6500E6" : "transparent",
            position: "absolute",
            left: "0",
          }}
        >
          {icon}
          {isOpen && (
            <Text
              fontWeight="600"
              fontSize="sm"
              color={Router.route === `/partners/${url}` ? "#0B132A" : "#A8A8A8"}
              transition="all 0.2s"
            >
              {label}
            </Text>
          )}
          {isOrders && (newOrders! > 0 || lateOrdersCount! > 0) && (
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
                {newOrders! + lateOrdersCount! > 9 ? "9+" : newOrders! + lateOrdersCount!}
              </Text>
            </Flex>
          )}
        </Flex>
      </Tooltip>
    </Link>
  )
}

const DashboardMenu = () => {
  moment.locale("lt")
  const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure()
  const currentUser = useCurrentUser()
  const [carServices] = useQuery(getUsersServices, null)
  const services = carServices!
  const selectedService = Router.query.activeService
    ? parseInt(Router.query.activeService as string)
    : parseInt(localStorage.getItem("selectedService") as string) || carServices![0].carServiceId
  const [activeService, setActiveService] = useState<number>(selectedService)
  const [activeCarService, { refetch }] = useQuery(getUsersActiveService, activeService)
  const [address] = useQuery(getServiceAddress, {
    where: { carServiceId: activeService },
  })
  const { isOpen, onToggle } = useDisclosure({
    defaultIsOpen:
      (Router.query.isOpen as string) === "true"
        ? true
        : (localStorage.getItem("isOpen") as string) === "true"
        ? true
        : false,
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
  const [lastNotificationsCount, setLastNotificationCount] = useState(0)
  const [notificationSound] = useSound("/notification.mp3")
  const [notificationsOrder, { refetch: refecthOrderNotifications }] = useQuery(
    getUserOrderNotifications,
    {
      where: { carServiceUserId: currentUser?.id },
      select: {
        id: true,
        createdAt: true,
        type: true,
        updateType: true,
        read: true,
        seen: true,
        order: {
          select: {
            id: true,
            service: {
              select: {
                id: true,
                name: true,
              },
            },
            client: {
              select: {
                id: true,
                name: true,
                surname: true,
                avatarUrl: true,
              },
            },
            carService: {
              select: {
                id: true,
                name: true,
                url: true,
              },
            },
          },
        },
      },
    },
    {
      refetchInterval: 60000,
      refetchIntervalInBackground: true,
    }
  )
  const [notificationsUpdate, { refetch: refecthUpdateNotifications }] = useQuery(
    getUserUpdateNotifications,
    {
      where: { carServiceUserId: currentUser?.id },
      select: {
        id: true,
        createdAt: true,
        type: true,
        read: true,
        seen: true,
        title: true,
        message: true,
        employee: {
          select: {
            id: true,
            carService: {
              select: {
                id: true,
                name: true,
                url: true,
              },
            },
            carServiceUser: {
              select: {
                id: true,
                name: true,
                surname: true,
                avatarUrl: true,
              },
            },
          },
        },
      },
    },
    {
      refetchInterval: 60000,
      refetchIntervalInBackground: true,
    }
  )
  const notificationsCount = ((notificationsOrder.filter((n) => n.seen === false)
    .length as number) + notificationsUpdate.filter((n) => n.seen === false).length) as number
  useEffect(() => {
    if (notificationsCount > lastNotificationsCount) notificationSound()
    return () => {
      setLastNotificationCount(notificationsCount)
    }
  }, [notificationsCount])
  const toast = useToast()
  const toastIdRef = useRef<any>()
  const [buttonLoading, setButtonLoading] = useState(false)

  const updateNotification = async (type: string, id: number, state: boolean) => {
    if (type === "ORDER") {
      await updateUserOrderNotification({
        where: {
          id: id,
          carServiceUserId: currentUser?.id,
        },
        data: {
          read: state,
        },
      }).then(() => {
        refecthOrderNotifications()
      })
    } else {
      await updateUserUpdateNotification({
        where: {
          id: id,
          carServiceUserId: currentUser?.id,
        },
        data: {
          read: state,
        },
      }).then(() => {
        refecthUpdateNotifications()
      })
    }
  }

  const updateAllNotifications = async () => {
    await updateUserOrderNotification({
      where: {
        carServiceUserId: currentUser?.id,
      },
      data: {
        read: true,
      },
    }).then(() => {
      refecthOrderNotifications()
    })
    await updateUserUpdateNotification({
      where: {
        carServiceUserId: currentUser?.id,
      },
      data: {
        read: true,
      },
    }).then(() => {
      refecthUpdateNotifications()
    })
  }

  const markAllNotificationsSeen = async () => {
    await updateUserOrderNotification({
      where: {
        carServiceUserId: currentUser?.id,
      },
      data: {
        seen: true,
      },
    }).then(() => {
      refecthOrderNotifications()
    })
    await updateUserUpdateNotification({
      where: {
        carServiceUserId: currentUser?.id,
      },
      data: {
        seen: true,
      },
    }).then(() => {
      refecthUpdateNotifications()
    })
  }

  const [notificationsVisible, setNotificationsVisible] = useState(false)
  const notificationsRef = useRef<HTMLDivElement>(null)
  useOutsideClick({
    ref: notificationsRef,
    handler: () => setNotificationsVisible(false),
  })

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
      {Router.route === "/partners/logs" && (
        <Head>
          {notificationsCount ? (
            <title>
              ({notificationsCount > 9 ? "9+" : notificationsCount}) Veiksmų žurnalas ・ Wheelter
            </title>
          ) : (
            <title>Veiksmų žurnalas ・ Wheelter</title>
          )}
        </Head>
      )}
      {Router.route === "/partners/discounts" && (
        <Head>
          {notificationsCount ? (
            <title>
              ({notificationsCount > 9 ? "9+" : notificationsCount}) Akcijos ・ Wheelter
            </title>
          ) : (
            <title>Akcijos ・ Wheelter</title>
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
          height="40px"
          background="brand.500"
          position="fixed"
          zIndex={12}
          width={isOpen ? "calc(100vw - 300px)" : "calc(100vw - 100px)"}
          ml={isOpen ? "300px" : "100px"}
          transition="all 0.2s"
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
                  position: "bottom-left",
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
            width={isOpen ? "calc(100vw - 300px)" : "calc(100vw - 100px)"}
            ml={isOpen ? "300px" : "100px"}
            transition="all 0.2s"
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
                    position: "bottom-left",
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
          <MenuLink
            isOpen={isOpen}
            url="dashboard"
            label="Suvestinė"
            icon={
              <HomeIcon
                boxSize={7}
                color={Router.route === "/partners/dashboard" ? "#6500E6" : "#A8A8A8"}
                mr={isOpen ? "20px" : "0"}
                ml={isOpen ? "70px" : "34px"}
                transition="all 0.2s"
              />
            }
            isOrders={false}
          />
          <MenuLink
            isOpen={isOpen}
            url="stats"
            label="Statistika"
            icon={
              <ActivityIcon
                boxSize={7}
                color={Router.route === "/partners/stats" ? "#6500E6" : "#A8A8A8"}
                mr={isOpen ? "20px" : "0"}
                ml={isOpen ? "70px" : "34px"}
                transition="all 0.2s"
              />
            }
            isOrders={false}
          />
          <MenuLink
            isOpen={isOpen}
            url="calendar"
            label="Kalendorius"
            icon={
              <CalendarDatesIcon
                boxSize={7}
                color={Router.route === "/partners/calendar" ? "#6500E6" : "#A8A8A8"}
                mr={isOpen ? "20px" : "0"}
                ml={isOpen ? "70px" : "34px"}
                transition="all 0.2s"
              />
            }
            isOrders={false}
          />
          <MenuLink
            isOpen={isOpen}
            url="orders"
            label="Užsakymai"
            icon={
              <CalendarNoteIcon
                boxSize={7}
                color={Router.route === "/partners/orders" ? "#6500E6" : "#A8A8A8"}
                mr={isOpen ? "20px" : "0"}
                ml={isOpen ? "70px" : "34px"}
                transition="all 0.2s"
              />
            }
            isOrders={true}
            newOrders={newOrders}
            lateOrdersCount={lateOrdersCount}
          />
          <MenuLink
            isOpen={isOpen}
            url="services"
            label="Paslaugos"
            icon={
              <BoxIcon
                boxSize={7}
                color={Router.route === "/partners/services" ? "#6500E6" : "#A8A8A8"}
                mr={isOpen ? "20px" : "0"}
                ml={isOpen ? "70px" : "34px"}
                transition="all 0.2s"
              />
            }
            isOrders={false}
          />
          {activeCarService?.carService.plan === "PREMIUM" && (
            <MenuLink
              isOpen={isOpen}
              url="logs"
              label="Veiksmų žurnalas"
              icon={
                <MenuRecIcon
                  boxSize={7}
                  color={Router.route === "/partners/logs" ? "#6500E6" : "#A8A8A8"}
                  mr={isOpen ? "20px" : "0"}
                  ml={isOpen ? "70px" : "34px"}
                  transition="all 0.2s"
                />
              }
              isOrders={false}
            />
          )}
          <MenuLink
            isOpen={isOpen}
            url="discounts"
            label="Akcijos"
            icon={
              <ProcentCircleIcon
                boxSize={7}
                color={Router.route === "/partners/discounts" ? "#6500E6" : "#A8A8A8"}
                mr={isOpen ? "20px" : "0"}
                ml={isOpen ? "70px" : "34px"}
                transition="all 0.2s"
              />
            }
            isOrders={false}
          />
          <MenuLink
            isOpen={isOpen}
            url="settings"
            label="Nustatymai"
            icon={
              <GearIcon
                boxSize={7}
                color={Router.route === "/partners/settings" ? "#6500E6" : "#A8A8A8"}
                mr={isOpen ? "20px" : "0"}
                ml={isOpen ? "70px" : "34px"}
                transition="all 0.2s"
              />
            }
            isOrders={false}
          />
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
              onClick={onModalOpen}
              sx={{
                ":hover > svg": {
                  color: "#6500E6",
                },
                ":hover > p": {
                  color: "#0B132A",
                },
              }}
            >
              <SendIcon
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
              <BookOpenIcon
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
              <HeadphonesIcon
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
                        {`${activeCarService?.carService.address?.street}, ${activeCarService?.carService.address?.city}`}
                      </Text>
                    </Flex>
                  )}
                  <ChevronDownIcon boxSize={4} color="#4F5665" ml="10px" transition="all 0.2s" />
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
                            setLastNotificationCount(0)
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
                                {`${service?.carService.address?.street}, ${service?.carService.address?.city}`}
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
                    transition="all 0.2s"
                    key="new"
                    onClick={() => {
                      console.log("create new car service")
                    }}
                  >
                    <Circle backgroundColor="#d8d8d8" size="32px">
                      <Center>
                        <FolderPlusIcon boxSize={4} color="text" ml="2px" transition="all 0.2s" />
                      </Center>
                    </Circle>
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
                          color="text"
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
          <Modal isOpen={isModalOpen} onClose={onModalClose} size="xl" isCentered>
            <ModalOverlay />
            <ModalContent>
              <Flex justifyContent="center" mt="20px">
                <SendIcon boxSize={10} color="brand.500" />
              </Flex>
              <ModalHeader textAlign="center" fontWeight="500" fontSize="2xl">
                Pasidalinkite savo servisu
                <Text color="text" fontWeight="400" fontSize="md" mt="10px">
                  Pasidalinkite savo servisu
                </Text>
              </ModalHeader>
              <ModalCloseButton />
              <Divider color="#d8d8d8" />
              <ModalBody mb="30px">
                <Text color="text" fontWeight="400" fontSize="md">
                  Nuoroda pasidalinimui:
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
                  <Text color="#787E97" ml="10px">
                    {window.location.hostname + "/partners/" + activeCarService?.carService.url}
                  </Text>
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
                        window.location.hostname + "/partners/" + activeCarService?.carService.url
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
                <Text color="text" fontWeight="400" fontSize="md" mt="20px">
                  Dalinkitės per:
                </Text>
                <Flex>
                  <Icon icon={<FacebookIcon boxSize={6} />} />
                  <Icon icon={<InstagramIcon boxSize={6} />} />
                </Flex>
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
                  _hover={{ backgroundColor: "#f8f8f8" }}
                  _focus={{ boxShadow: "none" }}
                  onClick={onModalClose}
                >
                  Atšaukti
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
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
              <MenuIcon
                boxSize={8}
                color="black"
                transition="all 0.2s"
                onClick={() => {
                  onToggle()
                  if (isOpen) localStorage.setItem("isOpen", "false")
                  else localStorage.setItem("isOpen", "true")
                }}
              />
            </Box>
            <Flex alignItems="center">
              <Box position="relative">
                <Button
                  _focus={{ boxShadow: "none" }}
                  sx={{
                    ":hover > span > div > svg": {
                      color: "#6500E6",
                    },
                  }}
                  p="0"
                  onClick={() => {
                    markAllNotificationsSeen()
                    setNotificationsVisible(notificationsVisible ? false : true)
                  }}
                >
                  <Flex>
                    <BellIcon boxSize={8} color="#0B132A" transition="all 0.2s" />
                    {notificationsCount > 0 && (
                      <Flex
                        justifyContent="center"
                        alignItems="center"
                        background="#FF5454"
                        width="18px"
                        height="18px"
                        borderRadius="100%"
                        transition="all 0.2s"
                        ml="-15px"
                      >
                        <Text
                          color="#ffffff"
                          fontWeight="500"
                          fontSize="0.6rem"
                          transition="all 0.2s"
                        >
                          {notificationsCount > 9 ? "9+" : notificationsCount}
                        </Text>
                      </Flex>
                    )}
                  </Flex>
                </Button>
                <Box
                  border="none"
                  backgroundColor="white"
                  borderRadius="10px"
                  boxShadow="0px 0px 20px 0px rgba(0, 0, 0, 0.3)"
                  position="absolute"
                  top="48px"
                  left="50%"
                  transform={
                    notificationsVisible
                      ? "translateX(-50%)"
                      : "translateZ(0px) translateY(100px) translateX(-50%)"
                  }
                  zIndex="15"
                  width="xl"
                  visibility={notificationsVisible ? "visible" : "hidden"}
                  ref={notificationsRef}
                  opacity={notificationsVisible ? 1 : 0}
                  transition="all 0.2s"
                >
                  <Tabs variant="unstyled">
                    <Flex p={6} alignItems="center" justifyContent="space-between">
                      <Heading fontWeight="500" color="black" fontSize="2xl">
                        Pranešimai
                      </Heading>
                      <Flex
                        alignItems="center"
                        color="brand.500"
                        fontSize="xs"
                        _hover={{ opacity: 0.8 }}
                        cursor="pointer"
                        onClick={() => updateAllNotifications()}
                      >
                        <EyeSlashIcon boxSize={4} mr={1} /> Pažymėti visus kaip perskaitytus
                      </Flex>
                    </Flex>
                    <TabList px={6} borderBottom="1px solid" borderColor="#efefef">
                      <CustomTabNotifications>
                        <Flex alignItems="center">
                          <CalendarNoteIcon boxSize={5} mr={1} /> Užsakymai
                          <Flex
                            justifyContent="center"
                            alignItems="center"
                            background="#FF5454"
                            width="24px"
                            height="16px"
                            borderRadius="10px"
                            ml="10px"
                          >
                            <Text color="#ffffff" fontWeight="400" fontSize="0.6rem">
                              {notificationsOrder.filter((n) => n.read === false).length}
                            </Text>
                          </Flex>
                        </Flex>
                      </CustomTabNotifications>
                      <CustomTabNotifications>
                        <Flex alignItems="center">
                          <RefreshIcon boxSize={5} mr={1} />
                          Atnaujinimai
                          <Flex
                            justifyContent="center"
                            alignItems="center"
                            background="#FF5454"
                            width="24px"
                            height="16px"
                            borderRadius="10px"
                            ml="10px"
                          >
                            <Text color="#ffffff" fontWeight="400" fontSize="0.6rem">
                              {notificationsUpdate.filter((n) => n.read === false).length}
                            </Text>
                          </Flex>
                        </Flex>
                      </CustomTabNotifications>
                    </TabList>
                    <Scrollbars autoHeight autoHeightMax={700} noScrollX>
                      <TabPanels>
                        <TabPanel p="0">
                          {notificationsOrder.length === 0 && (
                            <Text textAlign="center" py="20px" fontSize="xl">
                              Pranešimų nėra.
                            </Text>
                          )}
                          {notificationsOrder.filter((n) => n.read === false).length !== 0 && (
                            <Heading fontSize="xl" mx={6} py={2} fontWeight="600">
                              Neperskaityti
                            </Heading>
                          )}
                          {notificationsOrder
                            .filter((n) => n.read === false)
                            .sort(
                              (a: NotificationOrder, b: NotificationOrder) =>
                                b.createdAt.getTime() - a.createdAt.getTime()
                            )
                            .map((notification: any, i, { length }) => {
                              return (
                                <Flex
                                  justifyContent="space-between"
                                  px={6}
                                  py={4}
                                  borderBottom={i !== length - 1 ? "1px solid #efefef" : "none"}
                                  cursor="pointer"
                                  // as="a"
                                  // href={`/partners/orders/${notification.order.id}`}
                                  _hover={{ backgroundColor: "#F5F6FD" }}
                                  borderBottomRightRadius={
                                    notificationsOrder.filter((n) => n.read === true).length
                                      ? "0"
                                      : i !== length - 1
                                      ? "0"
                                      : "10px"
                                  }
                                  borderBottomLeftRadius={
                                    notificationsOrder.filter((n) => n.read === true).length
                                      ? "0"
                                      : i !== length - 1
                                      ? "0"
                                      : "10px"
                                  }
                                >
                                  <Flex mr="10px">
                                    <Avatar
                                      size="md"
                                      name={notification.order.client.name}
                                      src={notification.order.client.avatarUrl}
                                    />
                                    <Box ml="10px">
                                      <Heading fontSize="md" fontWeight="600" mb="5px">
                                        {notification.type === "NEW"
                                          ? "Naujas užsakymas"
                                          : notification.type === "UPDATED"
                                          ? "Atnaujintas užsakymas"
                                          : "Atšauktas užsakymas"}
                                      </Heading>
                                      <Text color="#525456" fontSize="sm">
                                        <Text display="inline" color="brand.500" fontWeight="400">
                                          {notification.order.client.name}{" "}
                                          {notification.order.client.surname[0]}.
                                        </Text>{" "}
                                        {notification.type === "NEW"
                                          ? "užsakė"
                                          : notification.type === "UPDATED"
                                          ? "atnaujino"
                                          : "atšaukė"}{" "}
                                        <Text display="inline" color="brand.500" fontWeight="500">
                                          {notification.order.service.name}
                                        </Text>{" "}
                                        {notification.type === "UPDATED" &&
                                        notification.updateType === "TIME"
                                          ? "laiką"
                                          : ""}{" "}
                                        servise{" "}
                                        <Text display="inline" color="brand.500" fontWeight="400">
                                          {notification.order.carService.name}
                                        </Text>
                                      </Text>
                                    </Box>
                                  </Flex>
                                  <Flex
                                    textAlign="end"
                                    minW="180px"
                                    direction="column"
                                    justifyContent="space-between"
                                  >
                                    <Text
                                      color="brand.500"
                                      fontSize="xs"
                                      _hover={{ opacity: 0.8 }}
                                      onClick={() =>
                                        updateNotification("ORDER", notification.id, true)
                                      }
                                    >
                                      <EyeSlashIcon boxSize={4} mr={1} />
                                      Pažymėti kaip perskaitytą
                                    </Text>
                                    <Text color="#B7BBC0" fontSize="xs">
                                      {moment(notification.createdAt).fromNow()}
                                    </Text>
                                  </Flex>
                                </Flex>
                              )
                            })}
                          {notificationsOrder.filter((n) => n.read === true).length !== 0 && (
                            <Heading fontSize="xl" mx={6} py={2} fontWeight="600">
                              Perskaityti
                            </Heading>
                          )}
                          {notificationsOrder
                            .filter((n) => n.read === true)
                            .sort(
                              (a: NotificationOrder, b: NotificationOrder) =>
                                b.createdAt.getTime() - a.createdAt.getTime()
                            )
                            .map((notification: any, i, { length }) => (
                              <Flex
                                justifyContent="space-between"
                                px={6}
                                py={4}
                                borderBottom={i !== length - 1 ? "1px solid #efefef" : "none"}
                                cursor="pointer"
                                _hover={{ backgroundColor: "#F5F6FD" }}
                                borderBottomRightRadius={i !== length - 1 ? "0" : "10px"}
                                borderBottomLeftRadius={i !== length - 1 ? "0" : "10px"}
                                color="text"
                              >
                                <Flex mr="10px">
                                  <Avatar
                                    size="md"
                                    name={notification.order.client.name}
                                    src={notification.order.client.avatarUrl}
                                  />
                                  <Box ml="10px">
                                    <Heading fontSize="md" fontWeight="600" mb="5px">
                                      {notification.type === "NEW"
                                        ? "Naujas užsakymas"
                                        : notification.type === "UPDATED"
                                        ? "Atnaujintas užsakymas"
                                        : "Atšauktas užsakymas"}
                                    </Heading>
                                    <Text color="#525456" fontSize="sm">
                                      <Text display="inline" fontWeight="400">
                                        {notification.order.client.name}{" "}
                                        {notification.order.client.surname[0]}.
                                      </Text>{" "}
                                      {notification.type === "NEW"
                                        ? "užsakė"
                                        : notification.type === "UPDATED"
                                        ? "atnaujino"
                                        : "atšaukė"}{" "}
                                      <Text display="inline" fontWeight="500">
                                        {notification.order.service.name}
                                      </Text>{" "}
                                      {notification.type === "UPDATED" &&
                                      notification.updateType === "TIME"
                                        ? "laiką"
                                        : ""}{" "}
                                      servise{" "}
                                      <Text display="inline" fontWeight="400">
                                        {notification.order.carService.name}
                                      </Text>
                                    </Text>
                                  </Box>
                                </Flex>
                                <Flex
                                  textAlign="end"
                                  minW="180px"
                                  direction="column"
                                  justifyContent="space-between"
                                >
                                  <Text
                                    color="brand.500"
                                    fontSize="xs"
                                    _hover={{ opacity: 0.8 }}
                                    onClick={() =>
                                      updateNotification("ORDER", notification.id, false)
                                    }
                                  >
                                    <EyeIcon boxSize={4} mr={1} />
                                    Pažymėti kaip neperskaitytą
                                  </Text>
                                  <Text color="#B7BBC0" fontSize="xs">
                                    {moment(notification.createdAt).fromNow()}
                                  </Text>
                                </Flex>
                              </Flex>
                            ))}
                        </TabPanel>
                        <TabPanel p="0">
                          {notificationsUpdate.length === 0 && (
                            <Text textAlign="center" py="20px" fontSize="xl">
                              Pranešimų nėra.
                            </Text>
                          )}
                          {notificationsUpdate.filter((n) => n.read === false).length !== 0 && (
                            <Heading fontSize="xl" mx={6} py={2} fontWeight="600">
                              Neperskaityti
                            </Heading>
                          )}
                          {notificationsUpdate
                            .filter((n) => n.read === false)
                            .sort(
                              (a: NotificationUpdate, b: NotificationUpdate) =>
                                b.createdAt.getTime() - a.createdAt.getTime()
                            )
                            .map((notification: any, i, { length }) => (
                              <Flex
                                justifyContent="space-between"
                                px={6}
                                py={4}
                                borderBottom={i !== length - 1 ? "1px solid #efefef" : "none"}
                                cursor="pointer"
                                // as="a"
                                // href={`/partners/orders/${notification.order.id}`}
                                _hover={{ backgroundColor: "#F5F6FD" }}
                                borderBottomRightRadius={
                                  notificationsUpdate.filter((n) => n.read === true).length
                                    ? "0"
                                    : i !== length - 1
                                    ? "0"
                                    : "10px"
                                }
                                borderBottomLeftRadius={
                                  notificationsUpdate.filter((n) => n.read === true).length
                                    ? "0"
                                    : i !== length - 1
                                    ? "0"
                                    : "10px"
                                }
                              >
                                <Flex mr="10px">
                                  <Avatar
                                    size="md"
                                    name={notification.employee.carServiceUser.name}
                                    src={notification.employee.carServiceUser.avatarUrl}
                                  />
                                  <Box ml="10px">
                                    <Heading fontSize="md" fontWeight="600" mb="5px">
                                      {notification.type === "EMPLOYEE"
                                        ? "Naujas darbuotojas"
                                        : "Naujas atnaujinimas"}
                                    </Heading>
                                    <Text color="#525456" fontSize="sm">
                                      {notification.type === "EMPLOYEE" && "Darbuotojas"}{" "}
                                      {notification.type === "EMPLOYEE" && (
                                        <Text display="inline" color="brand.500" fontWeight="500">
                                          {notification.employee.carServiceUser.name}{" "}
                                          {notification.employee.carServiceUser.surname}
                                        </Text>
                                      )}{" "}
                                      {notification.type === "EMPLOYEE" &&
                                        "sėkmingai užsiregistravo"}{" "}
                                      {notification.type === "EMPLOYEE" && "servise"}{" "}
                                      {notification.type === "EMPLOYEE" && (
                                        <Text display="inline" color="brand.500" fontWeight="500">
                                          {notification.employee.carService.name}
                                        </Text>
                                      )}{" "}
                                      {notification.type === "EMPLOYEE" &&
                                        "su jūsų suteikta vienkartine nuoroda"}
                                    </Text>
                                  </Box>
                                </Flex>
                                <Flex
                                  textAlign="end"
                                  minW="180px"
                                  direction="column"
                                  justifyContent="space-between"
                                >
                                  <Text
                                    color="brand.500"
                                    fontSize="xs"
                                    _hover={{ opacity: 0.8 }}
                                    onClick={() =>
                                      updateNotification("UPDATE", notification.id, true)
                                    }
                                  >
                                    <EyeSlashIcon boxSize={4} mr={1} />
                                    Pažymėti kaip perskaitytą
                                  </Text>
                                  <Text color="#B7BBC0" fontSize="xs">
                                    {moment(notification.createdAt).fromNow()}
                                  </Text>
                                </Flex>
                              </Flex>
                            ))}
                          {notificationsUpdate.filter((n) => n.read === true).length !== 0 && (
                            <Heading fontSize="xl" mx={6} py={2} fontWeight="600">
                              Perskaityti
                            </Heading>
                          )}
                          {notificationsUpdate
                            .filter((n) => n.read === true)
                            .sort(
                              (a: NotificationUpdate, b: NotificationUpdate) =>
                                b.createdAt.getTime() - a.createdAt.getTime()
                            )
                            .map((notification: any, i, { length }) => (
                              <Flex
                                justifyContent="space-between"
                                px={6}
                                py={4}
                                borderBottom={i !== length - 1 ? "1px solid #efefef" : "none"}
                                cursor="pointer"
                                _hover={{ backgroundColor: "#F5F6FD" }}
                                borderBottomRightRadius={i !== length - 1 ? "0" : "10px"}
                                borderBottomLeftRadius={i !== length - 1 ? "0" : "10px"}
                                color="text"
                              >
                                <Flex mr="10px">
                                  <Avatar
                                    size="md"
                                    name={notification.employee.carServiceUser.name}
                                    src={notification.employee.carServiceUser.avatarUrl}
                                  />
                                  <Box ml="10px">
                                    <Heading fontSize="md" fontWeight="600" mb="5px">
                                      {notification.type === "EMPLOYEE"
                                        ? "Naujas darbuotojas"
                                        : "Naujas atnaujinimas"}
                                    </Heading>
                                    <Text color="#525456" fontSize="sm">
                                      {notification.type === "EMPLOYEE" && "Darbuotojas"}{" "}
                                      {notification.type === "EMPLOYEE" && (
                                        <Text display="inline" fontWeight="500">
                                          {notification.employee.carServiceUser.name}{" "}
                                          {notification.employee.carServiceUser.surname}
                                        </Text>
                                      )}{" "}
                                      {notification.type === "EMPLOYEE" &&
                                        "sėkmingai užsiregistravo"}{" "}
                                      {notification.type === "EMPLOYEE" && "servise"}{" "}
                                      {notification.type === "EMPLOYEE" && (
                                        <Text display="inline" fontWeight="500">
                                          {notification.employee.carService.name}
                                        </Text>
                                      )}{" "}
                                      {notification.type === "EMPLOYEE" &&
                                        "su jūsų suteikta vienkartine nuoroda"}
                                    </Text>
                                  </Box>
                                </Flex>
                                <Flex
                                  textAlign="end"
                                  minW="180px"
                                  direction="column"
                                  justifyContent="space-between"
                                >
                                  <Text
                                    color="brand.500"
                                    fontSize="xs"
                                    _hover={{ opacity: 0.8 }}
                                    onClick={() =>
                                      updateNotification("UPDATE", notification.id, false)
                                    }
                                  >
                                    <EyeIcon boxSize={4} mr={1} />
                                    Pažymėti kaip neperskaitytą
                                  </Text>
                                  <Text color="#B7BBC0" fontSize="xs">
                                    {moment(notification.createdAt).fromNow()}
                                  </Text>
                                </Flex>
                              </Flex>
                            ))}
                        </TabPanel>
                      </TabPanels>
                    </Scrollbars>
                  </Tabs>
                </Box>
              </Box>
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
            <Orders
              isOpen={isOpen}
              activeService={activeService}
              newOrders={newOrders}
              lateOrdersCount={lateOrdersCount}
            />
          )}
          {Router.route === "/partners/services" && (
            <Services isOpen={isOpen} activeService={activeService} />
          )}
          {Router.route === "/partners/logs" && (
            <Logs
              isOpen={isOpen}
              activeService={activeService}
              plan={activeCarService?.carService.plan!}
            />
          )}
          {Router.route === "/partners/discounts" && (
            <Discounts isOpen={isOpen} activeService={activeService} />
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
              email={activeCarService?.carService.email!}
              phone={activeCarService?.carService.phone!}
              city={address?.city!}
              street={address?.street!}
              house={address?.house!}
              latitude={address?.coordinateY!}
              longitude={address?.coordinateX!}
              refetchOther={() => refetch()}
            />
          )}
        </Box>
      </Flex>
    </>
  )
}

export default DashboardMenu
