import React, { Suspense } from "react"
import { Link, useMutation, Image } from "blitz"
import {
  Container,
  Flex,
  Box,
  Link as ChakraLink,
  Button,
  Grid,
  Heading,
  Text,
} from "@chakra-ui/react"
import { SearchIcon } from "@chakra-ui/icons"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import Tabs from "app/components/index/Tabs"
import QuickHelp from "./QuickHelp"
import CheckIcon from "./CheckIcon"
import FastIcon from "./FastIcon"
import ReliableIcon from "./ReliableIcon"
import FacebookIcon from "./FacebookIcon"
import InstagramIcon from "./InstagramIcon"

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)
  if (currentUser) {
    return (
      <>
        <Button
          variant="solid"
          size="md"
          backgroundColor="brand.500"
          color="white"
          width="150px"
          height="41px"
          borderRadius="50px"
          fontWeight="500"
          _hover={{ backgroundColor: "brand.400" }}
          onClick={async () => {
            await logoutMutation()
          }}
        >
          Atsijungti
        </Button>
        {/* <button
            className="button small"
            onClick={async () => {
              await logoutMutation()
            }}
          >
            Logout
          </button>
          <div>
            User id: <code>{currentUser.id}</code>
            <br />
            User role: <code>{currentUser.role}</code>
          </div> */}
      </>
    )
  } else {
    return (
      <>
        {/* <Link href="/signup">
            <a className="button small">
              <strong>Sign Up</strong>
            </a>
          </Link> */}
        <Link href="/login">
          <Button
            variant="solid"
            size="md"
            backgroundColor="brand.500"
            color="white"
            width="150px"
            height="41px"
            borderRadius="50px"
            fontWeight="500"
            _hover={{ backgroundColor: "brand.400" }}
          >
            Prisijungti
          </Button>
        </Link>
      </>
    )
  }
}

const Main = () => {
  const partners = 0
  return (
    <Container bg="white" width="100vw" maxWidth="100vw" overflow="hidden" p={0}>
      <Box ml="15vw" mr="15vw" width="70vw" mt="30px" overflow="hidden" id="menu">
        <Flex alignItems="center">
          <Box mr="80px" height="41px" cursor="pointer">
            <Link href="/">
              <Image src="/logo.svg" height="41px" width="160px" alt="Wheelter logo" />
            </Link>
          </Box>
          <Grid templateColumns="2fr 1fr" width="calc(100% - 238px)">
            <Flex alignItems="center">
              <ChakraLink mr="40px" color="text">
                Stiklai
              </ChakraLink>
              <ChakraLink mr="40px" color="text">
                Švara
              </ChakraLink>
              <ChakraLink mr="40px" color="text">
                Ratai
              </ChakraLink>
              <ChakraLink mr="40px" color="text">
                Galia
              </ChakraLink>
              <ChakraLink mr="40px" color="text">
                Remontas
              </ChakraLink>
              <ChakraLink color="text">Dujos</ChakraLink>
            </Flex>
            <Flex justifySelf="flex-end" alignItems="center">
              <ChakraLink mr="30px" fontWeight="500">
                Paslaugų teikėjams
              </ChakraLink>
              <Suspense fallback="Kraunama...">
                <UserInfo />
              </Suspense>
            </Flex>
          </Grid>
        </Flex>
      </Box>
      <Box ml="15vw" width="85vw" id="main" mt="60px">
        <Grid mb="50px" templateColumns="1.4fr 2fr">
          <Box>
            <Box>
              <Heading size="2xl" fontWeight="500" lineHeight="1.4">
                Rinkitės praktiškumą, <br />
                registruokitės su <b>Wheelter.</b>
              </Heading>
              <Heading
                as="h2"
                fontSize="md"
                mt="1rem"
                color="text"
                mb="20px"
                fontWeight="400"
                lineHeight="2"
              >
                Registracija autopaslaugoms su <b>Wheelter</b> tapo daug paprastesnė. <br />
                Rezervuokite laiką dabar. Atsiskaitykite vietoje.
              </Heading>
            </Box>
            <Box>
              <Flex alignItems="center" justifyContent="center" mb="15px">
                <SearchIcon w={9} h={9} />
                <Heading as="h3" fontSize="3xl" ml="15px" fontWeight="500">
                  Paieška
                </Heading>
              </Flex>
              <Box
                backgroundColor="#fff"
                boxShadow="0px 0px 40px 0px rgba(0, 0, 0, 0.08);"
                borderRadius="10px"
              >
                <Tabs />
                <Button
                  variant="solid"
                  size="md"
                  width="80%"
                  ml="10%"
                  mr="10%"
                  borderRadius="10px"
                  backgroundColor="brand.500"
                  color="white"
                  mt="30px"
                  mb="30px"
                  _hover={{ backgroundColor: "brand.400" }}
                >
                  Ieškoti
                </Button>
              </Box>
            </Box>
          </Box>
          <Box alignSelf="center" justifySelf="center">
            <Image
              src="/illustration-main.svg"
              width="700px"
              height="539px"
              alt="Wheelter illustration"
            />
          </Box>
        </Grid>
        <Suspense fallback="Kraunama...">
          <QuickHelp />
        </Suspense>
      </Box>
      <Grid
        templateColumns="1fr 1fr 1fr"
        gap={10}
        mx="15vw"
        width="70vw"
        mt="3.75rem"
        minHeight="22rem"
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="center"
          backgroundColor="#fff"
          borderRadius="10px"
          p={12}
          position="relative"
          boxShadow="0px 0px 40px 0px rgba(0, 0, 0, 0.08);"
        >
          <Box backgroundColor="brand.500" borderRadius="100%" p="0.7rem">
            <FastIcon boxSize={8} color="white" />
          </Box>
          <Heading fontSize="2xl" as="h5" fontWeight="600" mt="1.5rem" mb="1.5rem">
            Greičiau
          </Heading>
          <Text color="#7e7e7e" fontSize="1rem" textAlign="center">
            Vos kelių mygtukų paspaudimu išsirinkite geriausią paslaugos teikėją jūsų automobiliui.
          </Text>
          <Link href="/about">
            <Text
              color="brand.500"
              fontWeight="600"
              pt="1.5rem"
              position="absolute"
              bottom={12}
              cursor="pointer"
              _hover={{ color: "brand.400" }}
            >
              Sužinokite daugiau →
            </Text>
          </Link>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="center"
          backgroundColor="#fff"
          borderRadius="10px"
          p={12}
          position="relative"
          boxShadow="0px 0px 40px 0px rgba(0, 0, 0, 0.08);"
        >
          <Box backgroundColor="brand.500" borderRadius="100%" p="0.7rem">
            <ReliableIcon boxSize={8} color="white" />
          </Box>
          <Heading fontSize="2xl" as="h5" fontWeight="600" mt="1.5rem" mb="1.5rem">
            Patogiau
          </Heading>
          <Text color="#7e7e7e" fontSize="1rem" textAlign="center">
            Vieta ir laikas nuo šiol nebe rodikliai.
          </Text>
          <Link href="/about">
            <Text
              color="brand.500"
              fontWeight="600"
              pt="1.5rem"
              position="absolute"
              bottom={12}
              cursor="pointer"
              _hover={{ color: "brand.400" }}
            >
              Sužinokite daugiau →
            </Text>
          </Link>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="center"
          backgroundColor="#fff"
          borderRadius="10px"
          p={12}
          position="relative"
          boxShadow="0px 0px 40px 0px rgba(0, 0, 0, 0.08);"
        >
          <Box backgroundColor="brand.500" borderRadius="100%" p="0.2rem">
            <CheckIcon boxSize={12} color="white" />
          </Box>
          <Heading fontSize="2xl" as="h5" fontWeight="600" mt="1.5rem" mb="1.5rem">
            Patikimiau
          </Heading>
          <Text color="#7e7e7e" fontSize="1rem" textAlign="center">
            Matykite paslaugos teikėjo informaciją bei kaupkite savo automobilio istoriją išmaniai.
          </Text>
          <Link href="/about">
            <Text
              color="brand.500"
              fontWeight="600"
              pt="1.5rem"
              position="absolute"
              bottom={12}
              cursor="pointer"
              _hover={{ color: "brand.400" }}
            >
              Sužinokite daugiau →
            </Text>
          </Link>
        </Box>
      </Grid>
      <Box mx="15vw" width="70vw" my={12}>
        <Heading fontSize="4xl" as="h2" fontWeight="700" mt="1.5rem" mb="1.5rem" textAlign="center">
          Daugiau nei{" "}
          <Text fontSize="6xl" fontWeight="700" display="inline" color="brand.500">
            {Math.floor(partners / 10) * 10}
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
          mx="15vw"
          px={20}
          py={14}
          width="70vw"
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
            <Link href="/partners/register">
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
            </Link>
          </Box>
        </Grid>
      </Box>
      <Box backgroundColor="gray">
        <Grid templateColumns="1fr 1fr 1fr 1fr 1fr" width="70vw" mx="15vw" pt={8} pb={12}>
          <Flex flexDirection="column">
            <Box height="41px" cursor="pointer">
              <Link href="/">
                <Image src="/logo.svg" height="41px" width="160px" alt="Wheelter logo" />
              </Link>
            </Box>
            <Flex my={6}>
              <Link href="/">
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
              </Link>
              <Link href="/">
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
            <Link href="/">
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
            <Link href="/">
              <Text
                fontSize="sm"
                cursor="pointer"
                _hover={{ color: "brand.500" }}
                color="text"
                mb={3}
              >
                Punktas
              </Text>
            </Link>
            <Link href="/">
              <Text
                fontSize="sm"
                cursor="pointer"
                _hover={{ color: "brand.500" }}
                color="text"
                mb={3}
              >
                Punktas
              </Text>
            </Link>
            <Link href="/">
              <Text
                fontSize="sm"
                cursor="pointer"
                _hover={{ color: "brand.500" }}
                color="text"
                mb={3}
              >
                Punktas
              </Text>
            </Link>
            <Link href="/">
              <Text fontSize="sm" cursor="pointer" _hover={{ color: "brand.500" }} color="text">
                Punktas
              </Text>
            </Link>
          </Flex>
          <Flex flexDirection="column">
            <Heading fontSize="md" as="h5" fontWeight="600" mb={6}>
              Paslaugų teikėjams
            </Heading>
            <Link href="/">
              <Text
                fontSize="sm"
                cursor="pointer"
                _hover={{ color: "brand.500" }}
                color="text"
                mb={3}
              >
                Punktas
              </Text>
            </Link>
            <Link href="/">
              <Text
                fontSize="sm"
                cursor="pointer"
                _hover={{ color: "brand.500" }}
                color="text"
                mb={3}
              >
                Punktas
              </Text>
            </Link>
            <Link href="/">
              <Text
                fontSize="sm"
                cursor="pointer"
                _hover={{ color: "brand.500" }}
                color="text"
                mb={3}
              >
                Punktas
              </Text>
            </Link>
            <Link href="/">
              <Text
                fontSize="sm"
                cursor="pointer"
                _hover={{ color: "brand.500" }}
                color="text"
                mb={3}
              >
                Punktas
              </Text>
            </Link>
          </Flex>
          <Flex flexDirection="column">
            <Heading fontSize="md" as="h5" fontWeight="600" mb={6}>
              Wheelter
            </Heading>
            <Link href="/">
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
            <Link href="/">
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
            <Link href="/">
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
            <Link href="/">
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

export default Main
