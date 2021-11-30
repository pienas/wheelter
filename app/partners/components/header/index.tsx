import {
  Flex,
  Link as ChakraLink,
  Heading,
  MenuButton,
  MenuList,
  Menu,
  MenuOptionGroup,
  MenuItemOption,
  Text,
  Button,
} from "@chakra-ui/react"
import ChevronDownIcon from "app/core/components/icons/ChevronDownIcon"
import { Image, Link, Routes } from "blitz"
import ReactCountryFlag from "react-country-flag"

const MenuLink = ({ children }) => {
  return (
    <ChakraLink mr="20px" color="text">
      {children}
    </ChakraLink>
  )
}

type MenuOptionProps = {
  value: string
  country: string
}

const MenuOption = ({ value, country }: MenuOptionProps) => {
  return (
    <MenuItemOption value={value} icon={<></>} iconSpacing={0}>
      <Flex alignItems="center">
        <ReactCountryFlag countryCode={country} svg />
        <Text fontSize="sm" color="text" ml="5px" lineHeight="0.8">
          {value}
        </Text>
      </Flex>
    </MenuItemOption>
  )
}

const Header = () => {
  return (
    <Flex
      pt="30px"
      pb="50px"
      overflow="hidden"
      justifyContent="space-between"
      px="calc((100vw - 1280px) / 2)"
    >
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
        <MenuLink>Privalumai</MenuLink>
        <MenuLink>Informacija</MenuLink>
        <MenuLink>Kainodara</MenuLink>
      </Flex>
      <Flex alignItems="center">
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon boxSize={4} color="#4F5665" transition="all 0.2s" />}
            fontWeight="400"
            color="text"
            _focus={{ boxShadow: "none" }}
          >
            LT
          </MenuButton>
          <MenuList
            border="none"
            boxShadow="0 0 0 1px hsl(0deg 0% 0% / 10%), 0 4px 11px hsl(0deg 0% 0% / 10%)"
            width="auto"
            minWidth="60px"
          >
            <MenuOptionGroup defaultValue="LT">
              <MenuOption value="LT" country="LT" />
              <MenuOption value="EN" country="US" />
              <MenuOption value="RU" country="RU" />
            </MenuOptionGroup>
          </MenuList>
        </Menu>
        <Link href="/" passHref>
          <ChakraLink fontWeight="500" _hover={{ textDecoration: "none" }} color="text" mr="20px">
            Klientams
          </ChakraLink>
        </Link>
        <Link href="/partners/dashboard" passHref>
          <ChakraLink fontWeight="500" _hover={{ textDecoration: "none" }} color="text" mr="20px">
            Valdymo panelė
          </ChakraLink>
        </Link>
        <Link href="/" passHref>
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
              width={56}
              height={14}
              borderRadius="10px"
              fontWeight="600"
              boxShadow="0 5px 15px 0 rgb(100 0 230 / 30%)"
              _hover={{ backgroundColor: "brand.400" }}
            >
              Tapkite partneriu
            </Button>
          </ChakraLink>
        </Link>
      </Flex>
    </Flex>
  )
}

export default Header
