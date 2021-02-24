import React, { Suspense } from "react"
import { Link, useMutation } from "blitz"
import { Container, Flex, Box, Link as ChakraLink, Button, Grid, Heading } from "@chakra-ui/react"
import { SearchIcon } from "@chakra-ui/icons"
import { Image } from "blitz"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import Tabs from "app/components/Tabs"
import QuickHelp from "./QuickHelp"

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
          borderRadius="5px"
          fontWeight="600"
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
            borderRadius="5px"
            fontWeight="600"
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
  return (
    <Container
      bg="url('bg.svg') top center no-repeat"
      width="100vw"
      maxWidth="100vw"
      minHeight="2415px"
      maxHeight="2415px"
      overflow="hidden"
    >
      <Box ml="15vw" mr="15vw" width="70vw" mt="30px" overflow="hidden" id="menu">
        <Flex alignItems="center">
          <Box mr="80px" height="41px" cursor="pointer">
            <Link href="/">
              <Image src="/logo.svg" height="41" width="200px" alt="Wheelter logo" />
            </Link>
          </Box>
          <Grid templateColumns="2fr 1fr" width="calc(100% - 280px)">
            <Flex alignItems="center">
              <ChakraLink mr="40px">Stiklai</ChakraLink>
              <ChakraLink mr="40px">Švara</ChakraLink>
              <ChakraLink mr="40px">Ratai</ChakraLink>
              <ChakraLink mr="40px">Galia</ChakraLink>
              <ChakraLink mr="40px">Remontas</ChakraLink>
              <ChakraLink>Dujos</ChakraLink>
            </Flex>
            <Flex justifySelf="flex-end" alignItems="center">
              <ChakraLink mr="30px">Paslaugų teikėjams</ChakraLink>
              <Suspense fallback="Kraunama...">
                <UserInfo />
              </Suspense>
            </Flex>
          </Grid>
        </Flex>
      </Box>
      <Box ml="15vw" width="85vw" id="main" mt="60px">
        <Heading size="2xl">
          Lorem ipsum dolor sit amet, <br />
          consectetur adipiscing elit, sed do...
        </Heading>
        <Heading as="h2" size="md" mt="24px" color="gray.500" mb="40px" fontWeight="300">
          Rezervuokite laiką dabar. Atsiskaitykite vietoje.
        </Heading>
        <Grid mb="50px" templateColumns="33.8% 60% 6.2%">
          <Box>
            <Flex alignItems="center" justifyContent="center" mb="15px">
              <SearchIcon w={9} h={9} />
              <Heading as="h3" size="lg" ml="15px">
                Paieška
              </Heading>
            </Flex>
            <Box
              backgroundColor="#fff"
              boxShadow="0px 0px 40px 0px rgba(0, 0, 0, 0.05);"
              borderRadius="10px"
            >
              <Tabs />
              <Button
                variant="solid"
                size="md"
                width="80%"
                ml="10%"
                mr="10%"
                borderRadius="5px"
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
          <Box ml="80px">
            <Image
              src="/illustration-main.svg"
              width="967px"
              height="447px"
              alt="Wheelter illustration"
            />
          </Box>
        </Grid>
        <Suspense fallback="Kraunama...">
          <QuickHelp />
        </Suspense>
      </Box>
    </Container>
  )
}

export default Main
