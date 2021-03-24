import { Avatar } from "@chakra-ui/avatar"
import { useDisclosure } from "@chakra-ui/hooks"
import { Box, Divider, Flex, Heading, Text } from "@chakra-ui/layout"
import { TabList, Tabs } from "@chakra-ui/tabs"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { Link } from "blitz"
import React from "react"
import AlertIcon from "./AlertIcon"
import BurgerIcon from "./BurgerIcon"
import CalendarIcon from "./CalendarIcon"
import ChartIcon from "./ChartIcon"
import CustomTab from "./CustomTab"
import DotsIcon from "./DotsIcon"
import DownIcon from "./DownIcon"
import HelpIcon from "./HelpIcon"
import HouseIcon from "./HouseIcon"
import Logo from "./Logo"
import MoneyIcon from "./MoneyIcon"
import NotificationIcon from "./NotificationIcon"
import OrdersIcon from "./OrdersIcon"
import RatingIcon from "./RatingIcon"
import ReviewIcon from "./ReviewIcon"
import ServicesIcon from "./ServicesIcon"
import SettingsIcon from "./SettingsIcon"
import ShareIcon from "./ShareIcon"
import WikiIcon from "./WikiIcon"
import { Doughnut, Line } from "react-chartjs-2"
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table"

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const name = currentUser?.name + " " + currentUser?.surname
  return (
    <>
      <Avatar size="sm" name={name} />
      <Text fontWeight="500" color="#4F5665" mx="10px" transition="all 0.2s">
        {name}
      </Text>
      <DownIcon boxSize={2} color="#4F5665" transition="all 0.2s" />
    </>
  )
}

const Dashboard = () => {
  const orders = 10
  const quickhelp = 2
  const notifications = 10
  const serviceName = "Auto shop"
  const userRole = "Savininkas"
  const active = 11
  const done = 1
  const canceled = 2
  const all = active + done + canceled
  const backgroundActive = `linear-gradient(90deg, #6500E6 ${(active / all) * 100}%, #E5E5E5 ${
    (active / all) * 100
  }%)`
  const backgroundDone = `linear-gradient(90deg, #9B4CFF ${(done / all) * 100}%, #E5E5E5 ${
    (done / all) * 100
  }%)`
  const backgroundCanceled = `linear-gradient(90deg, #46009F ${(canceled / all) * 100}%, #E5E5E5 ${
    (canceled / all) * 100
  }%)`
  const { isOpen, onToggle } = useDisclosure({
    defaultIsOpen: false,
  })
  const dataDoughnut = {
    labels: ["Aktyvūs užsakymai", "Atlikti užsakymai", "Atmesti užsakymai"],
    datasets: [
      {
        data: [11, 1, 2],
        backgroundColor: ["#6500E6", "#9B4CFF", "#46009F"],
      },
    ],
  }
  const dataLine = (canvas) => {
    const ctx = canvas.getContext("2d")
    const gradient = ctx.createLinearGradient(0, 100, 0, 400)
    gradient.addColorStop(0, "rgba(101, 0, 230, 0.5")
    gradient.addColorStop(1, "rgba(255, 255, 255, 0")
    return {
      labels: ["Sau", "Vas", "Kov", "Bal", "Geg", "Bir", "Lie", "Rug", "Rug", "Spa", "Lap", "Gru"],
      datasets: [
        {
          data: [4.1, 4.03, 4.2, 4.4, 4.5, 4.52, 4.55, 4.58, 4.6, 4.51, 4.7, 4.82],
          fill: "start",
          borderWidth: 5,
          borderCapStyle: "round",
          borderJoinStyle: "round",
          backgroundColor: gradient,
          borderColor: "#6500E6",
          pointRadius: 0,
        },
      ],
    }
  }

  return (
    <Flex width="100vw" minHeight="100vh">
      <Flex
        direction="column"
        background="white"
        height="100vh"
        minWidth={isOpen ? "300px" : "100px"}
        zIndex={10}
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
        <Flex
          justifyContent="flex-start"
          alignItems="center"
          height="50px"
          cursor="pointer"
          transition="all 0.2s"
          background="#FDF9FF"
          position="relative"
          _before={{
            content: '""',
            borderRadius: "0 50px 50px 0",
            width: "6px",
            height: "100%",
            background: "#6500E6",
            position: "absolute",
            left: "0",
          }}
        >
          <HouseIcon
            boxSize={7}
            color="#6500E6"
            mr={isOpen ? "20px" : "0"}
            ml={isOpen ? "70px" : "34px"}
            transition="all 0.2s"
          />
          {isOpen && (
            <Text fontWeight="600" fontSize="sm" color="#0B132A" transition="all 0.2s">
              Suvestinė
            </Text>
          )}
        </Flex>
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
          <ChartIcon
            boxSize={7}
            color="#A8A8A8"
            mr={isOpen ? "20px" : "0"}
            ml={isOpen ? "70px" : "34px"}
            transition="all 0.2s"
          />
          {isOpen && (
            <Text fontWeight="600" fontSize="sm" color="#A8A8A8" transition="all 0.2s">
              Statistika
            </Text>
          )}
        </Flex>
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
          <CalendarIcon
            boxSize={7}
            color="#A8A8A8"
            mr={isOpen ? "20px" : "0"}
            ml={isOpen ? "70px" : "34px"}
            transition="all 0.2s"
          />
          {isOpen && (
            <Text fontWeight="600" fontSize="sm" color="#A8A8A8" transition="all 0.2s">
              Kalendorius
            </Text>
          )}
        </Flex>
        <Flex
          justifyContent="flex-start"
          alignItems="center"
          height="50px"
          cursor="pointer"
          transition="all 0.2s"
          _hover={{ background: "#FDF9FF" }}
          position="relative"
          sx={{
            ":hover > svg": {
              color: "#6500E6",
            },
            ":hover > p": {
              color: "#0B132A",
            },
          }}
        >
          <OrdersIcon
            boxSize={7}
            color="#A8A8A8"
            mr={isOpen ? "20px" : "0"}
            ml={isOpen ? "70px" : "34px"}
            transition="all 0.2s"
          />
          {isOpen && (
            <Text fontWeight="600" fontSize="sm" color="#A8A8A8" transition="all 0.2s">
              Užsakymai
            </Text>
          )}
          {orders > 0 && (
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
                {orders > 9 ? "9+" : orders}
              </Text>
            </Flex>
          )}
        </Flex>
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
          <ServicesIcon
            boxSize={7}
            color="#A8A8A8"
            mr={isOpen ? "20px" : "0"}
            ml={isOpen ? "70px" : "34px"}
            transition="all 0.2s"
          />
          {isOpen && (
            <Text fontWeight="600" fontSize="sm" color="#A8A8A8" transition="all 0.2s">
              Paslaugos
            </Text>
          )}
        </Flex>
        <Flex
          justifyContent="flex-start"
          alignItems="center"
          height="50px"
          cursor="pointer"
          transition="all 0.2s"
          _hover={{ background: "#FDF9FF" }}
          position="relative"
          sx={{
            ":hover > svg": {
              color: "#6500E6",
            },
            ":hover > p": {
              color: "#0B132A",
            },
          }}
        >
          <AlertIcon
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
              Greita pagalba
            </Text>
          )}
          {quickhelp > 0 && (
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
                {quickhelp > 9 ? "9+" : quickhelp}
              </Text>
            </Flex>
          )}
        </Flex>
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
          <SettingsIcon
            boxSize={7}
            color="#A8A8A8"
            mr={isOpen ? "20px" : "0"}
            ml={isOpen ? "70px" : "34px"}
            transition="all 0.2s"
          />
          {isOpen && (
            <Text fontWeight="600" fontSize="sm" color="#A8A8A8" transition="all 0.2s">
              Nustatymai
            </Text>
          )}
        </Flex>
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
          <WikiIcon
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
          <HelpIcon
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
        <Box position="absolute" bottom="0" width="100%">
          <Flex
            justifyContent="center"
            alignItems="center"
            height="50px"
            cursor="pointer"
            _hover={{ background: "#FDF9FF" }}
            sx={{
              ":hover > svg": {
                color: "#6500E6",
              },
              ":hover > div h5": {
                color: "#6500E6",
              },
            }}
          >
            <Avatar size="sm" name={serviceName} border="2px solid #6500E6" transition="all 0.2s" />
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
                  {serviceName}
                </Heading>
                <Text
                  fontWeight="400"
                  color="#A8A8A8"
                  textAlign="center"
                  fontSize="xs"
                  whiteSpace="nowrap"
                  transition="all 0.2s"
                >
                  {userRole}
                </Text>
              </Flex>
            )}
            <DownIcon boxSize={2} color="#4F5665" ml="10px" transition="all 0.2s" />
          </Flex>
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
      <Box background="#F8F8F8" minHeight="100vh" width="100%">
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
            zIndex={10}
            cursor="pointer"
            transition="all 0.4s"
            sx={{
              ":hover > svg": {
                color: "#6500E6",
              },
            }}
            justifySelf="flex-start"
          >
            <BurgerIcon boxSize={6} color="black" transition="all 0.2s" onClick={onToggle} />
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
              <NotificationIcon boxSize={8} color="#4F5665" transition="all 0.2s" />
              {notifications > 0 && (
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
                    {notifications > 9 ? "9+" : notifications}
                  </Text>
                </Flex>
              )}
            </Flex>
            <Flex
              alignItems="center"
              ml="30px"
              cursor="pointer"
              sx={{
                ":hover > p": {
                  color: "#6500E6",
                },
                ":hover > svg": {
                  color: "#6500E6",
                },
              }}
            >
              <UserInfo />
            </Flex>
          </Flex>
        </Flex>
        <Box mr="70px" ml={isOpen ? "370px" : "170px"} transition="all 0.2s">
          <Heading as="h1">Suvestinė</Heading>
          <Flex justifyContent="space-between" my="30px">
            <Box
              background="#fff"
              borderRadius="10px"
              boxShadow="20px 20px 30px 0px rgba(0, 0, 0, 0.03)"
              width="20%"
              py="30px"
              px="40px"
            >
              <Flex justifyContent="space-between">
                <Flex
                  background="#6500E6"
                  borderRadius="10px"
                  width="44px"
                  height="44px"
                  alignItems="center"
                  justifyContent="center"
                  mb="15px"
                >
                  <MoneyIcon boxSize={7} color="#ffffff" />
                </Flex>
                <DotsIcon
                  boxSize={4}
                  color="#0B132A"
                  cursor="pointer"
                  _hover={{ color: "#6500E6" }}
                />
              </Flex>
              <Text fontWeight="500" fontSize="4xl" lineHeight="1">
                79375.5 €
              </Text>
              <Text fontSize="xl" color="#A8A8A8">
                <b>Visos</b> pajamos
              </Text>
            </Box>
            <Box
              background="#fff"
              borderRadius="10px"
              boxShadow="20px 20px 30px 0px rgba(0, 0, 0, 0.03)"
              width="20%"
              py="30px"
              px="40px"
            >
              <Flex justifyContent="space-between">
                <Flex
                  background="#6500E6"
                  borderRadius="10px"
                  width="44px"
                  height="44px"
                  alignItems="center"
                  justifyContent="center"
                  mb="15px"
                >
                  <OrdersIcon boxSize={7} color="#ffffff" />
                </Flex>
                <DotsIcon
                  boxSize={4}
                  color="#0B132A"
                  cursor="pointer"
                  _hover={{ color: "#6500E6" }}
                />
              </Flex>
              <Text fontWeight="500" fontSize="4xl" lineHeight="1">
                1745
              </Text>
              <Text fontSize="xl" color="#A8A8A8">
                <b>Viso</b> užsakymų
              </Text>
            </Box>
            <Box
              background="#fff"
              borderRadius="10px"
              boxShadow="20px 20px 30px 0px rgba(0, 0, 0, 0.03)"
              width="20%"
              py="30px"
              px="40px"
            >
              <Flex justifyContent="space-between">
                <Flex
                  background="#6500E6"
                  borderRadius="10px"
                  width="44px"
                  height="44px"
                  alignItems="center"
                  justifyContent="center"
                  mb="15px"
                >
                  <ReviewIcon boxSize={7} color="#ffffff" />
                </Flex>
                <DotsIcon
                  boxSize={4}
                  color="#0B132A"
                  cursor="pointer"
                  _hover={{ color: "#6500E6" }}
                />
              </Flex>
              <Text fontWeight="500" fontSize="4xl" lineHeight="1">
                862
              </Text>
              <Text fontSize="xl" color="#A8A8A8">
                <b>Viso</b> atsiliepimų
              </Text>
            </Box>
            <Box
              background="#fff"
              borderRadius="10px"
              boxShadow="20px 20px 30px 0px rgba(0, 0, 0, 0.03)"
              width="20%"
              py="30px"
              px="40px"
            >
              <Flex justifyContent="space-between">
                <Flex
                  background="#6500E6"
                  borderRadius="10px"
                  width="44px"
                  height="44px"
                  alignItems="center"
                  justifyContent="center"
                  mb="15px"
                >
                  <RatingIcon boxSize={7} color="#ffffff" />
                </Flex>
                <DotsIcon
                  boxSize={4}
                  color="#0B132A"
                  cursor="pointer"
                  _hover={{ color: "#6500E6" }}
                />
              </Flex>
              <Text fontWeight="500" fontSize="4xl" lineHeight="1">
                4,82
              </Text>
              <Text fontSize="xl" color="#A8A8A8">
                <b>Vidutinis</b> įvertinimas
              </Text>
            </Box>
          </Flex>
          <Flex justifyContent="space-between" my="30px">
            <Box
              background="#fff"
              borderRadius="10px"
              boxShadow="20px 20px 30px 0px rgba(0, 0, 0, 0.03)"
              width="46.67%"
              p="40px"
            >
              <Flex justifyContent="space-between" alignItems="center">
                <Flex
                  alignItems="center"
                  cursor="pointer"
                  sx={{
                    ":hover > p": {
                      color: "#6500E6",
                    },
                    ":hover > svg": {
                      color: "#6500E6",
                    },
                  }}
                >
                  <Text fontSize="3xl" fontWeight="500" transition="all 0.2s">
                    Užsakymai
                  </Text>
                  <DownIcon boxSize={4} transition="all 0.2s" ml="10px" />
                </Flex>
                <Tabs variant="unstyled" isFitted background="#F1F1F1" p="3px" borderRadius="10px">
                  <TabList>
                    <CustomTab>Metų</CustomTab>
                    <CustomTab>Mėnesio</CustomTab>
                    <CustomTab>Savaitės</CustomTab>
                    <CustomTab>Dienos</CustomTab>
                  </TabList>
                </Tabs>
              </Flex>
              <Flex
                mt="20px"
                justifyContent="space-between"
                alignItems="center"
                background="#F4E3FF"
                borderRadius="10px"
                p="10px"
              >
                <Flex alignItems="center">
                  <Flex
                    alignItems="center"
                    justifyContent="center"
                    width="70px"
                    height="35px"
                    background="#6500E6"
                    borderRadius="7px"
                  >
                    <Text fontWeight="500" fontSize="2xl" color="#ffffff">
                      4
                    </Text>
                  </Flex>
                  <Text fontWeight="500" fontSize="xl" ml="20px" mr="10px">
                    Nauji užsakymai
                  </Text>
                  <Box width="10px" height="10px" background="#6500E6" borderRadius="100%" />
                </Flex>
                <Flex
                  alignItems="center"
                  cursor="pointer"
                  sx={{
                    ":hover > p": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  <Text color="#6500E6">Peržiūrėti užsakymus</Text>
                  <DownIcon
                    boxSize={3}
                    transition="all 0.2s"
                    mx="10px"
                    color="#6500E6"
                    transform="rotate(270deg)"
                  />
                </Flex>
              </Flex>
              <Flex justifyContent="space-between" mt="20px">
                <Box borderRadius="5px" border="1px solid #EFEFEF" px="20px" py="10px" width="30%">
                  <Text fontWeight="500" fontSize="3xl">
                    {active}
                  </Text>
                  <Text color="#A8A8A8" fontSize="xl">
                    <b>Aktyvių</b> užsakymų
                  </Text>
                </Box>
                <Box borderRadius="5px" border="1px solid #EFEFEF" px="20px" py="10px" width="30%">
                  <Text fontWeight="500" fontSize="3xl">
                    {done}
                  </Text>
                  <Text color="#A8A8A8" fontSize="xl">
                    <b>Atliktų</b> užsakymų
                  </Text>
                </Box>
                <Box borderRadius="5px" border="1px solid #EFEFEF" px="20px" py="10px" width="30%">
                  <Text fontWeight="500" fontSize="3xl">
                    {canceled}
                  </Text>
                  <Text color="#A8A8A8" fontSize="xl">
                    <b>Atmestų</b> užsakymų
                  </Text>
                </Box>
              </Flex>
              <Flex mt="40px">
                <Box width="100px" height="100px" mr="30px">
                  <Doughnut
                    data={dataDoughnut}
                    legend={{ display: false }}
                    options={{ tooltips: { enabled: false }, hover: { mode: null } }}
                    width={100}
                    height={100}
                  />
                </Box>
                <Flex width="100%" direction="column" justifyContent="space-between">
                  <Flex alignItems="center" justifyContent="space-between">
                    <Text>Aktyvūs užsakymai ({((active / all) * 100).toFixed(1)}%)</Text>
                    <Flex alignItems="center" width="70%" justifyContent="space-between">
                      <Box
                        width="90%"
                        height="8px"
                        borderRadius="8px"
                        background={backgroundActive}
                      />
                      <Text color="#A8A8A8">{active}</Text>
                    </Flex>
                  </Flex>
                  <Flex alignItems="center" justifyContent="space-between">
                    <Text>Atlikti užsakymai ({((done / all) * 100).toFixed(1)}%)</Text>
                    <Flex alignItems="center" width="70%" justifyContent="space-between">
                      <Box
                        width="90%"
                        height="8px"
                        borderRadius="8px"
                        background={backgroundDone}
                      />
                      <Text color="#A8A8A8">{done}</Text>
                    </Flex>
                  </Flex>
                  <Flex alignItems="center" justifyContent="space-between">
                    <Text>Atmesti užsakymai ({((canceled / all) * 100).toFixed(1)}%)</Text>
                    <Flex alignItems="center" width="70%" justifyContent="space-between">
                      <Box
                        width="90%"
                        height="8px"
                        borderRadius="8px"
                        background={backgroundCanceled}
                      />
                      <Text color="#A8A8A8">{canceled}</Text>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
            </Box>
            <Box
              background="#fff"
              borderRadius="10px"
              boxShadow="20px 20px 30px 0px rgba(0, 0, 0, 0.03)"
              width="46.67%"
              p="40px"
            >
              <Flex justifyContent="space-between" alignItems="center" mb="20px">
                <Flex
                  alignItems="center"
                  cursor="pointer"
                  sx={{
                    ":hover > p": {
                      color: "#6500E6",
                    },
                    ":hover > svg": {
                      color: "#6500E6",
                    },
                  }}
                >
                  <Text fontSize="3xl" fontWeight="500" transition="all 0.2s">
                    Įvertinimas
                  </Text>
                  <DownIcon boxSize={4} transition="all 0.2s" ml="10px" />
                </Flex>
                <Tabs variant="unstyled" isFitted background="#F1F1F1" p="3px" borderRadius="10px">
                  <TabList>
                    <CustomTab>Metų</CustomTab>
                    <CustomTab>Mėnesio</CustomTab>
                    <CustomTab>Savaitės</CustomTab>
                    <CustomTab>Dienos</CustomTab>
                  </TabList>
                </Tabs>
              </Flex>
              <Line
                data={dataLine}
                legend={{ display: false }}
                height={95}
                options={{
                  tooltips: { enabled: false },
                  hover: { mode: null },
                  scales: {
                    xAxes: [
                      {
                        display: true,
                        gridLines: {
                          lineWidth: 0,
                          zeroLineWidth: 0,
                          zeroLineColor: "rgba(255, 255, 255, 0)",
                        },
                        ticks: {
                          fontColor: "#0B132A",
                          fontFamily: "Rubik Medium",
                          fontSize: 14,
                        },
                      },
                    ],
                    yAxes: [
                      {
                        display: true,
                        ticks: {
                          fontColor: "#0B132A",
                          fontFamily: "Rubik Medium",
                          fontSize: 14,
                          maxTicksLimit: 6,
                          autoSkip: true,
                        },
                      },
                    ],
                  },
                }}
              />
            </Box>
          </Flex>
          <Box>
            <Text fontSize="3xl" fontWeight="500" mb="15px">
              Šiandienos tvarkaraštis
            </Text>
            <Table>
              <Thead>
                <Tr background="#E5E5E5" height="50px" borderRadius="10px">
                  <Th
                    color="#4F5665"
                    fontWeight="600"
                    fontSize="xl"
                    textTransform="none"
                    letterSpacing="normal"
                    border="none"
                    borderTopLeftRadius="10px"
                    borderBottomLeftRadius="10px"
                  >
                    Laikas
                  </Th>
                  <Th
                    color="#4F5665"
                    fontWeight="600"
                    fontSize="xl"
                    textTransform="none"
                    letterSpacing="normal"
                    border="none"
                  >
                    Paslauga
                  </Th>
                  <Th
                    color="#4F5665"
                    fontWeight="600"
                    fontSize="xl"
                    textTransform="none"
                    letterSpacing="normal"
                    border="none"
                  >
                    Trukmė
                  </Th>
                  <Th
                    color="#4F5665"
                    fontWeight="600"
                    fontSize="xl"
                    textTransform="none"
                    letterSpacing="normal"
                    border="none"
                  >
                    Klientas
                  </Th>
                  <Th
                    color="#4F5665"
                    fontWeight="600"
                    fontSize="xl"
                    textTransform="none"
                    letterSpacing="normal"
                    border="none"
                  >
                    Darbuotojas
                  </Th>
                  <Th
                    color="#4F5665"
                    fontWeight="600"
                    fontSize="xl"
                    textTransform="none"
                    letterSpacing="normal"
                    border="none"
                  >
                    Kaina
                  </Th>
                  <Th
                    color="#4F5665"
                    fontWeight="600"
                    fontSize="xl"
                    textTransform="none"
                    letterSpacing="normal"
                    border="none"
                    borderTopRightRadius="10px"
                    borderBottomRightRadius="10px"
                  >
                    Statusas
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr height="50px">
                  <Td border="none" color="#0B132A" fontWeight="500">
                    2021-03-21 10:30
                  </Td>
                  <Td border="none" color="#0B132A" fontWeight="500">
                    Kėbulo dažymas
                  </Td>
                  <Td border="none" color="#0B132A" fontWeight="500">
                    4 val. 30 min.
                  </Td>
                  <Td border="none" color="#0B132A" fontWeight="500">
                    Laurynas T.
                  </Td>
                  <Td border="none" color="#0B132A" fontWeight="500">
                    Karolis
                  </Td>
                  <Td border="none" color="#0B132A" fontWeight="500">
                    250 €
                  </Td>
                  <Td border="none" color="#0B132A" fontWeight="600">
                    Užbaigti užsakymą
                  </Td>
                </Tr>
                <Tr height="50px" background="#F1F1F1">
                  <Td
                    border="none"
                    color="#0B132A"
                    fontWeight="500"
                    borderTopLeftRadius="10px"
                    borderBottomLeftRadius="10px"
                  >
                    2021-03-21 12:45
                  </Td>
                  <Td border="none" color="#0B132A" fontWeight="500">
                    Antikorozinis padengimas
                  </Td>
                  <Td border="none" color="#0B132A" fontWeight="500">
                    1 val.
                  </Td>
                  <Td border="none" color="#0B132A" fontWeight="500">
                    Rokas A.
                  </Td>
                  <Td border="none" color="#0B132A" fontWeight="500">
                    Henrikas
                  </Td>
                  <Td border="none" color="#0B132A" fontWeight="500">
                    80 €
                  </Td>
                  <Td
                    border="none"
                    color="#0B132A"
                    fontWeight="600"
                    borderTopRightRadius="10px"
                    borderBottomRightRadius="10px"
                  >
                    Užbaigti užsakymą
                  </Td>
                </Tr>
                <Tr height="50px">
                  <Td border="none" color="#0B132A" fontWeight="500">
                    2021-03-21 14:00
                  </Td>
                  <Td border="none" color="#0B132A" fontWeight="500">
                    Kėbulo geometrijos matavimas
                  </Td>
                  <Td color="#0B132A" fontWeight="500" border="none">
                    30 min.
                  </Td>
                  <Td color="#0B132A" fontWeight="500" border="none">
                    Martynas B.
                  </Td>
                  <Td border="none" color="#0B132A" fontWeight="500">
                    Henrikas
                  </Td>
                  <Td border="none" color="#0B132A" fontWeight="500">
                    50 €
                  </Td>
                  <Td border="none" color="#0B132A" fontWeight="600">
                    Užbaigti užsakymą
                  </Td>
                </Tr>
                <Tr height="50px" background="#F1F1F1">
                  <Td
                    border="none"
                    color="#0B132A"
                    fontWeight="500"
                    borderTopLeftRadius="10px"
                    borderBottomLeftRadius="10px"
                  >
                    2021-03-21 12:45
                  </Td>
                  <Td border="none" color="#0B132A" fontWeight="500">
                    Antikorozinis padengimas
                  </Td>
                  <Td border="none" color="#0B132A" fontWeight="500">
                    1 val.
                  </Td>
                  <Td border="none" color="#0B132A" fontWeight="500">
                    Rokas A.
                  </Td>
                  <Td border="none" color="#0B132A" fontWeight="500">
                    Henrikas
                  </Td>
                  <Td border="none" color="#0B132A" fontWeight="500">
                    80 €
                  </Td>
                  <Td
                    border="none"
                    color="#0B132A"
                    fontWeight="600"
                    borderTopRightRadius="10px"
                    borderBottomRightRadius="10px"
                  >
                    Užbaigti užsakymą
                  </Td>
                </Tr>
                <Tr height="50px">
                  <Td border="none" color="#0B132A" fontWeight="500">
                    2021-03-21 14:00
                  </Td>
                  <Td border="none" color="#0B132A" fontWeight="500">
                    Kėbulo geometrijos matavimas
                  </Td>
                  <Td color="#0B132A" fontWeight="500" border="none">
                    30 min.
                  </Td>
                  <Td color="#0B132A" fontWeight="500" border="none">
                    Martynas B.
                  </Td>
                  <Td border="none" color="#0B132A" fontWeight="500">
                    Henrikas
                  </Td>
                  <Td border="none" color="#0B132A" fontWeight="500">
                    50 €
                  </Td>
                  <Td border="none" color="#0B132A" fontWeight="600">
                    Užbaigti užsakymą
                  </Td>
                </Tr>
                <Tr height="50px" background="#F1F1F1">
                  <Td
                    border="none"
                    color="#0B132A"
                    fontWeight="500"
                    borderTopLeftRadius="10px"
                    borderBottomLeftRadius="10px"
                  >
                    2021-03-21 12:45
                  </Td>
                  <Td border="none" color="#0B132A" fontWeight="500">
                    Antikorozinis padengimas
                  </Td>
                  <Td border="none" color="#0B132A" fontWeight="500">
                    1 val.
                  </Td>
                  <Td border="none" color="#0B132A" fontWeight="500">
                    Rokas A.
                  </Td>
                  <Td border="none" color="#0B132A" fontWeight="500">
                    Henrikas
                  </Td>
                  <Td border="none" color="#0B132A" fontWeight="500">
                    80 €
                  </Td>
                  <Td
                    border="none"
                    color="#0B132A"
                    fontWeight="600"
                    borderTopRightRadius="10px"
                    borderBottomRightRadius="10px"
                  >
                    Užbaigti užsakymą
                  </Td>
                </Tr>
                <Tr height="50px">
                  <Td border="none" color="#0B132A" fontWeight="500">
                    2021-03-21 14:00
                  </Td>
                  <Td border="none" color="#0B132A" fontWeight="500">
                    Kėbulo geometrijos matavimas
                  </Td>
                  <Td color="#0B132A" fontWeight="500" border="none">
                    30 min.
                  </Td>
                  <Td color="#0B132A" fontWeight="500" border="none">
                    Martynas B.
                  </Td>
                  <Td border="none" color="#0B132A" fontWeight="500">
                    Henrikas
                  </Td>
                  <Td border="none" color="#0B132A" fontWeight="500">
                    50 €
                  </Td>
                  <Td border="none" color="#0B132A" fontWeight="600">
                    Užbaigti užsakymą
                  </Td>
                </Tr>
                <Tr height="50px" background="#F1F1F1">
                  <Td
                    border="none"
                    color="#0B132A"
                    fontWeight="500"
                    borderTopLeftRadius="10px"
                    borderBottomLeftRadius="10px"
                  >
                    2021-03-21 12:45
                  </Td>
                  <Td border="none" color="#0B132A" fontWeight="500">
                    Antikorozinis padengimas
                  </Td>
                  <Td border="none" color="#0B132A" fontWeight="500">
                    1 val.
                  </Td>
                  <Td border="none" color="#0B132A" fontWeight="500">
                    Rokas A.
                  </Td>
                  <Td border="none" color="#0B132A" fontWeight="500">
                    Henrikas
                  </Td>
                  <Td border="none" color="#0B132A" fontWeight="500">
                    80 €
                  </Td>
                  <Td
                    border="none"
                    color="#0B132A"
                    fontWeight="600"
                    borderTopRightRadius="10px"
                    borderBottomRightRadius="10px"
                  >
                    Užbaigti užsakymą
                  </Td>
                </Tr>
                <Tr height="50px">
                  <Td border="none" color="#0B132A" fontWeight="500">
                    2021-03-21 14:00
                  </Td>
                  <Td border="none" color="#0B132A" fontWeight="500">
                    Kėbulo geometrijos matavimas
                  </Td>
                  <Td color="#0B132A" fontWeight="500" border="none">
                    30 min.
                  </Td>
                  <Td color="#0B132A" fontWeight="500" border="none">
                    Martynas B.
                  </Td>
                  <Td border="none" color="#0B132A" fontWeight="500">
                    Henrikas
                  </Td>
                  <Td border="none" color="#0B132A" fontWeight="500">
                    50 €
                  </Td>
                  <Td border="none" color="#0B132A" fontWeight="600">
                    Užbaigti užsakymą
                  </Td>
                </Tr>
                <Tr height="50px" background="#F1F1F1">
                  <Td
                    border="none"
                    color="#0B132A"
                    fontWeight="500"
                    borderTopLeftRadius="10px"
                    borderBottomLeftRadius="10px"
                  >
                    2021-03-21 12:45
                  </Td>
                  <Td border="none" color="#0B132A" fontWeight="500">
                    Antikorozinis padengimas
                  </Td>
                  <Td border="none" color="#0B132A" fontWeight="500">
                    1 val.
                  </Td>
                  <Td border="none" color="#0B132A" fontWeight="500">
                    Rokas A.
                  </Td>
                  <Td border="none" color="#0B132A" fontWeight="500">
                    Henrikas
                  </Td>
                  <Td border="none" color="#0B132A" fontWeight="500">
                    80 €
                  </Td>
                  <Td
                    border="none"
                    color="#0B132A"
                    fontWeight="600"
                    borderTopRightRadius="10px"
                    borderBottomRightRadius="10px"
                  >
                    Užbaigti užsakymą
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </Box>
        </Box>
      </Box>
    </Flex>
  )
}

export default Dashboard
