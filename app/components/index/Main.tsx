import React, { useState } from "react"
import { Link, useMutation, Image, useQuery, Routes } from "blitz"
import {
  Container,
  Flex,
  Link as ChakraLink,
  Button,
  Heading,
  Text,
  Avatar,
  Menu,
  Box,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuDivider,
  MenuOptionGroup,
  Grid,
  Tooltip,
} from "@chakra-ui/react"
import { ChevronDownIcon } from "@chakra-ui/icons"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import Tabs from "app/components/index/Tabs"
import TrustworthyIcon from "./TrustworthyIcon"
import FastIcon from "./FastIcon"
import ReliableIcon from "./ReliableIcon"
import FacebookIcon from "./FacebookIcon"
import InstagramIcon from "./InstagramIcon"
import DownIcon from "../partners/ArrowIcon"
import getServicesCount from "app/partners/queries/getServicesCount"
import BrandText from "./BrandText"
import ServicesIcon from "./ServicesIcon"
import LocationIcon from "./LocationIcon"
import CalendarIcon from "./CalendarIcon"
import Select from "react-select"

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const name = currentUser?.name + " " + currentUser?.surname
  const [logoutMutation] = useMutation(logout)
  if (currentUser) {
    return (
      <Menu>
        <MenuButton
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
            <Avatar size="sm" name={name} />
            <Text fontWeight="500" mx="10px" transition="all 0.2s">
              {name}
            </Text>
            <DownIcon boxSize={2} color="#4F5665" transition="all 0.2s" />
          </Flex>
        </MenuButton>
        <MenuList border="none" boxShadow="20px 20px 30px 0px rgba(0, 0, 0, 0.03)">
          <MenuItem _hover={{ background: "#F8F8F8" }}>Mano tr. priemonės</MenuItem>
          <MenuItem _hover={{ background: "#F8F8F8" }}>Mano rezervacijos</MenuItem>
          <MenuItem _hover={{ background: "#F8F8F8" }}>Pamėgti servisai</MenuItem>
          <MenuItem _hover={{ background: "#F8F8F8" }}>Paslaugų teikėjai</MenuItem>
          <MenuDivider color="#d8d8d8" />
          <MenuItem _hover={{ background: "#F8F8F8" }}>Naujienos</MenuItem>
          <MenuItem _hover={{ background: "#F8F8F8" }}>Naudojimosi instrukcija</MenuItem>
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
  } else {
    return (
      <>
        <Link href="/login" passHref>
          <ChakraLink
            sx={{
              ":hover": {
                textDecoration: "none",
              },
            }}
          >
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
              Prisijungti
            </Button>
          </ChakraLink>
        </Link>
      </>
    )
  }
}

const MainNew = () => {
  const locations = [
    { value: "klaipeda", label: "Klaipėda" },
    { value: "kaunas", label: "Kaunas" },
    { value: "vilnius", label: "Vilnius" },
  ]
  const [servicesCount] = useQuery(getServicesCount, {
    where: {
      isReviewed: true,
    },
  })
  const customStyles = {
    container: (provided) => ({
      ...provided,
      height: "18px",
    }),
    control: (provided) => ({
      ...provided,
      border: "none",
      boxShadow: "none",
      minHeight: "0",
      height: "18px",
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
  }
  return (
    <Container bg="white" width="100vw" maxWidth="100vw" overflow="hidden" p={0}>
      <Flex px="200px" pt="30px" pb="50px" overflow="hidden" justifyContent="space-between">
        <Flex alignItems="center">
          <Link href={Routes.Home()} passHref>
            <ChakraLink
              sx={{
                ":hover": {
                  textDecoration: "none",
                },
              }}
            >
              <Flex alignItems="center" mr="50px" cursor="pointer">
                <Image src="/logo.svg" alt="Wheelter logo" width="70px" height="62px" />
                <Heading fontSize="2xl">Wheelter</Heading>
              </Flex>
            </ChakraLink>
          </Link>
          <ChakraLink mr="20px" color="text">
            Važiuoklė
          </ChakraLink>
          <ChakraLink mr="20px" color="text">
            Kėbulas
          </ChakraLink>
          <ChakraLink mr="20px" color="text">
            Variklis
          </ChakraLink>
          <ChakraLink mr="20px" color="text">
            Modifikavimas
          </ChakraLink>
          <ChakraLink mr="20px" color="text">
            Priežiūra
          </ChakraLink>
          <ChakraLink mr="20px" color="text">
            Ratai
          </ChakraLink>
          <ChakraLink color="text">Kita</ChakraLink>
        </Flex>
        <Flex alignItems="center">
          <Menu>
            <Tooltip label="Kalba" aria-label="Kalba" background="#EFF0F3" color="black">
              <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                fontWeight="400"
                color="text"
                _focus={{ boxShadow: "none" }}
              >
                LT
              </MenuButton>
            </Tooltip>
            <MenuList
              border="none"
              boxShadow="0px 0px 20px 0px rgba(0, 0, 0, 0.3)"
              width="auto"
              minWidth="80px"
            >
              <MenuOptionGroup defaultValue="LT" title="Kalba" type="radio">
                <MenuItemOption value="LT">LT</MenuItemOption>
                <MenuItemOption value="EN">EN</MenuItemOption>
                <MenuItemOption value="RU">RU</MenuItemOption>
              </MenuOptionGroup>
            </MenuList>
          </Menu>
          <Link href="/partners/dashboard" passHref>
            <ChakraLink fontWeight="500" _hover={{ textDecoration: "none" }} color="text" mr="20px">
              Paslaųgų teikėjams
            </ChakraLink>
          </Link>
          <UserInfo />
        </Flex>
      </Flex>
      <Flex>
        <Box maxWidth="650px" ml="200px">
          <Heading size="2xl" fontWeight="500" lineHeight="1.4">
            Rinkitės praktiškumą, <br />
            registruokitės su <BrandText>Wheelter</BrandText>.
          </Heading>
          <Heading
            as="h2"
            fontSize="md"
            mt="1rem"
            color="text"
            mb="50px"
            fontWeight="400"
            lineHeight="2"
          >
            Registracija autopaslaugoms su <BrandText>Wheelter</BrandText> tapo daug paprastesnė.{" "}
            <br />
            Rezervuokite laiką dabar. Atsiskaitykite vietoje.
          </Heading>
          <Flex
            backgroundColor="#ffffff"
            maxWidth="500px"
            boxShadow="0 0 30px 0 rgba(0, 0, 0, 10%)"
            borderRadius="10px"
            mb="20px"
          >
            <Box
              backgroundColor="brand.500"
              borderRadius="100%"
              p="0.7rem"
              mr="30px"
              my="20px"
              ml="20px"
            >
              <FastIcon boxSize={8} color="white" />
            </Box>
            <Box>
              <Heading as="h2" fontSize="18px" mt="15px">
                Greičiau
              </Heading>
              <Text fontSize="14px" color="text" mt="5px">
                Vos kelių mygtukų paspaudimu išsirinkite geriausią paslaugos teikėją jūsų
                automobiliui.
              </Text>
            </Box>
          </Flex>
          <Flex
            backgroundColor="#ffffff"
            maxWidth="500px"
            boxShadow="0 0 30px 0 rgba(0, 0, 0, 10%)"
            borderRadius="10px"
            mb="20px"
          >
            <Box
              backgroundColor="brand.500"
              borderRadius="100%"
              p="0.7rem"
              mr="30px"
              my="20px"
              ml="20px"
            >
              <ReliableIcon boxSize={8} color="white" />
            </Box>
            <Box>
              <Heading as="h2" fontSize="18px" mt="15px">
                Patogiau
              </Heading>
              <Text fontSize="14px" color="text" mt="5px">
                Vieta ir laikas nuo šiol nebe rodikliai.
              </Text>
            </Box>
          </Flex>
          <Flex
            backgroundColor="#ffffff"
            maxWidth="500px"
            boxShadow="0 0 30px 0 rgba(0, 0, 0, 10%)"
            borderRadius="10px"
            mb="20px"
          >
            <Box
              backgroundColor="brand.500"
              borderRadius="100%"
              p="0.7rem"
              mr="30px"
              my="20px"
              ml="20px"
            >
              <TrustworthyIcon boxSize={8} color="white" />
            </Box>
            <Box>
              <Heading as="h2" fontSize="18px" mt="15px">
                Patikimiau
              </Heading>
              <Text fontSize="14px" color="text" mt="5px">
                Matykite paslaugos teikėjo informaciją bei kaupkite savo automobilio istoriją
                išmaniai.
              </Text>
            </Box>
          </Flex>
        </Box>
        <Box justifySelf="flex-end" alignSelf="center">
          <Image src="/illustration.svg" width="900px" height="532px" alt="Wheelter illustration" />
        </Box>
      </Flex>
      <Flex
        backgroundColor="#ffffff"
        boxShadow="0 0 30px 0 rgba(0, 0, 0, 10%)"
        borderRadius="10px"
        mx="200px"
        p="55px"
        mt="20px"
        position="relative"
      >
        <Box backgroundColor="green.300" borderRadius="full" position="absolute" top="-15px">
          <Text fontSize="14px" color="white" px="35px" py="5px">
            Paieška
          </Text>
        </Box>
        <Flex alignItems="center" width="350px">
          <LocationIcon boxSize={8} color="brand.500" />
          <Box ml="20px" position="relative">
            <Text fontSize="14px" color="#a0a0a0">
              Pasirinkite lokaciją
            </Text>
            <Select options={locations} styles={customStyles} placeholder="Pasirinkite" />
          </Box>
        </Flex>
        <Box backgroundColor="brand.500" width="5px" borderRadius="full" opacity="0.5" mr="30px" />
        <Flex alignItems="center" width="350px">
          <CalendarIcon boxSize={8} color="brand.500" />
          <Box ml="20px">
            <Text fontSize="14px" color="#a0a0a0">
              Pasirinkite datą
            </Text>
            <Text fontSize="14px" color="text" fontWeight="500">
              2021.09.16
            </Text>
          </Box>
        </Flex>
        <Box backgroundColor="brand.500" width="5px" borderRadius="full" opacity="0.5" mr="30px" />
        <Flex alignItems="center" width="350px">
          <ServicesIcon boxSize={8} color="brand.500" />
          <Box ml="20px">
            <Text fontSize="14px" color="#a0a0a0">
              Pasirinkite paslaugą
            </Text>
            <Text fontSize="14px" color="text" fontWeight="500">
              Langų tamsinimas
            </Text>
          </Box>
        </Flex>
        <Box backgroundColor="brand.500" width="5px" borderRadius="full" opacity="0.5" mr="30px" />
        <Flex direction="column" width="350px" alignItems="center" justifyContent="center">
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
      <Box mx="200px" my={12}>
        <Heading fontSize="4xl" as="h2" fontWeight="700" my="1.5rem" textAlign="center">
          Daugiau nei{" "}
          <Text fontSize="6xl" fontWeight="700" display="inline" color="brand.500">
            {Math.floor(servicesCount / 10) * 10}
          </Text>{" "}
          įmonių
          <br />
          pasitiki mumis
        </Heading>
      </Box>
      <Box
        width="100vw"
        pb={12}
        background="linear-gradient(0deg, rgba(248,248,248,1) 50%, rgba(255,255,255,1) 50%)"
      >
        <Grid
          templateColumns="1fr 1fr"
          mx="200px"
          px="120px"
          py={16}
          backgroundColor="white"
          boxShadow="0px 10px 40px 0px rgba(0, 0, 0, 0.08);"
          borderRadius="10px"
        >
          <Box>
            <Heading fontSize="3xl" as="h4" fontWeight="600">
              Esi automobilių serviso savininkas?
              <br />
              Palik klientų paiešką mums.
            </Heading>
            <Text fontSize="md" mt={6}>
              Užsiregistruokite mūsų sistemoje ir mes jums suteikime paprastą ir intuityvią verslo
              valdymo sistemą, kuri palengvins jūsų darbą.
            </Text>
          </Box>
          <Box alignSelf="center" justifySelf="flex-end">
            <Link href="/partners/dashboard" passHref>
              <ChakraLink
                sx={{
                  ":hover": {
                    textDecoration: "none",
                  },
                }}
              >
                <Button
                  variant="solid"
                  size="md"
                  backgroundColor="brand.500"
                  color="white"
                  borderRadius="10px"
                  height="60px"
                  width="250px"
                  fontWeight="600"
                  _hover={{ backgroundColor: "brand.400" }}
                  boxShadow="0px 5px 15px 0px rgba(100, 0, 230, 0.3);"
                >
                  Tapkite partneriu
                </Button>
              </ChakraLink>
            </Link>
          </Box>
        </Grid>
      </Box>
      <Box backgroundColor="gray">
        <Grid templateColumns="1fr 1fr 1fr 1fr 1fr" width="70vw" mx="15vw" pt={8} pb={12}>
          <Flex flexDirection="column">
            <Link href={Routes.Home()} passHref>
              <ChakraLink
                sx={{
                  ":hover": {
                    textDecoration: "none",
                  },
                }}
              >
                <Flex alignItems="center" mr="50px" cursor="pointer">
                  <Image src="/logo.svg" alt="Wheelter logo" width="70px" height="62px" />
                  <Heading fontSize="2xl">Wheelter</Heading>
                </Flex>
              </ChakraLink>
            </Link>
            <Flex my={6}>
              <Link href="/" passHref>
                <ChakraLink>
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
                    <FacebookIcon boxSize={6} />
                  </Box>
                </ChakraLink>
              </Link>
              <Link href="/" passHref>
                <ChakraLink>
                  <Box
                    backgroundColor="white"
                    borderRadius="100%"
                    p="0.4rem"
                    boxShadow="0px 0px 10px 0px rgba(0, 0, 0, 0.12);"
                    cursor="pointer"
                    color="brand.500"
                    _hover={{ backgroundColor: "brand.500", color: "white" }}
                    transition="all 0.2s"
                  >
                    <InstagramIcon boxSize={6} />
                  </Box>
                </ChakraLink>
              </Link>
            </Flex>
            <Text fontSize="xs" color="text">
              Wheelter @ 2021.
            </Text>
            <Text fontSize="xs" color="text">
              Visos teisės saugomos.
            </Text>
          </Flex>
          <Flex flexDirection="column">
            <Heading fontSize="md" as="h5" fontWeight="600" mb={4}>
              MB „Mėtyk“
            </Heading>
            <Text fontSize="sm" color="text">
              Malūnininkų g. 3,
            </Text>
            <Text fontSize="sm" mb={8} color="text">
              92264, Klaipėda
            </Text>
            <Link href="/" passHref>
              <Text
                fontSize="md"
                fontWeight="700"
                color="brand.500"
                textDecoration="underline"
                cursor="pointer"
                _hover={{ color: "brand.400" }}
                transition="all 0.2s"
              >
                info@wheelter.lt
              </Text>
            </Link>
          </Flex>
          <Flex flexDirection="column">
            <Heading fontSize="md" as="h5" fontWeight="600" mb={6}>
              Klientams
            </Heading>
            <Link href="/" passHref>
              <Text
                fontSize="sm"
                cursor="pointer"
                _hover={{ color: "brand.500" }}
                color="text"
                mb={3}
              >
                Kodėl verta būti klientu?
              </Text>
            </Link>
            <Link href="/" passHref>
              <Text
                fontSize="sm"
                cursor="pointer"
                _hover={{ color: "brand.500" }}
                color="text"
                mb={3}
              >
                Naujienos
              </Text>
            </Link>
            <Link href="/" passHref>
              <Text
                fontSize="sm"
                cursor="pointer"
                _hover={{ color: "brand.500" }}
                color="text"
                mb={3}
              >
                Atsiliepimai
              </Text>
            </Link>
            <Link href="/" passHref>
              <Text fontSize="sm" cursor="pointer" _hover={{ color: "brand.500" }} color="text">
                Užsisakyk naujienlaiškį
              </Text>
            </Link>
          </Flex>
          <Flex flexDirection="column">
            <Heading fontSize="md" as="h5" fontWeight="600" mb={6}>
              Paslaugų teikėjams
            </Heading>
            <Link href="/" passHref>
              <Text
                fontSize="sm"
                cursor="pointer"
                _hover={{ color: "brand.500" }}
                color="text"
                mb={3}
              >
                Wheelter paslaugų teikėjams
              </Text>
            </Link>
            <Link href="/" passHref>
              <Text
                fontSize="sm"
                cursor="pointer"
                _hover={{ color: "brand.500" }}
                color="text"
                mb={3}
              >
                Naujienos
              </Text>
            </Link>
          </Flex>
          <Flex flexDirection="column">
            <Heading fontSize="md" as="h5" fontWeight="600" mb={6}>
              Wheelter
            </Heading>
            <Link href="/" passHref>
              <Text
                fontSize="sm"
                cursor="pointer"
                _hover={{ color: "brand.500" }}
                color="text"
                mb={3}
              >
                Apie mus
              </Text>
            </Link>
            <Link href="/" passHref>
              <Text
                fontSize="sm"
                cursor="pointer"
                _hover={{ color: "brand.500" }}
                color="text"
                mb={3}
              >
                Teisinės nuostatos
              </Text>
            </Link>
            <Link href="/" passHref>
              <Text
                fontSize="sm"
                cursor="pointer"
                _hover={{ color: "brand.500" }}
                color="text"
                mb={3}
              >
                Sausainiukų nustatymai
              </Text>
            </Link>
            <Link href="/" passHref>
              <Text
                fontSize="sm"
                cursor="pointer"
                _hover={{ color: "brand.500" }}
                color="text"
                mb={3}
              >
                Klientų pagalbos centras
              </Text>
            </Link>
          </Flex>
        </Grid>
      </Box>
    </Container>
  )
}

export default MainNew
