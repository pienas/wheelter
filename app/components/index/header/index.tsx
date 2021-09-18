import {
  Flex,
  Link as ChakraLink,
  Heading,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Menu,
  MenuOptionGroup,
  MenuItemOption,
  Avatar,
  Text,
  Button,
} from "@chakra-ui/react"
import { Image, Link, Routes, useMutation } from "blitz"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import DownIcon from "../../partners/ArrowIcon"
import ReactCountryFlag from "react-country-flag"

type ItemProps = {
  children: React.ReactNode
  onClick?: () => void
}

const Item = ({ children, onClick }: ItemProps) => {
  return (
    <MenuItem
      fontSize="14px"
      color="text"
      py="0.3rem"
      _hover={{ background: "#F8F8F8" }}
      onClick={onClick}
    >
      {children}
    </MenuItem>
  )
}

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
    <MenuItemOption value={value}>
      <Flex alignItems="center">
        <ReactCountryFlag countryCode={country} svg />
        <Text fontSize="14px" color="text" ml="5px" lineHeight="0.8">
          {value}
        </Text>
      </Flex>
    </MenuItemOption>
  )
}

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
        <MenuList
          border="none"
          boxShadow="0 0 0 1px hsl(0deg 0% 0% / 10%), 0 4px 11px hsl(0deg 0% 0% / 10%)"
          minWidth="13rem"
        >
          <Item>Mano tr. priemonės</Item>
          <Item>Mano rezervacijos</Item>
          <Item>Pamėgti servisai</Item>
          <Item>Paslaugų teikėjai</Item>
          <MenuDivider color="#d8d8d8" />
          <Item>Naujienos</Item>
          <Item>Naudojimosi instrukcija</Item>
          <Item>Nustatymai</Item>
          <Item
            onClick={async () => {
              await logoutMutation()
            }}
          >
            Atsijungti
          </Item>
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

const Header = () => {
  return (
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
        <MenuLink>Važiuoklė</MenuLink>
        <MenuLink>Kėbulas</MenuLink>
        <MenuLink>Variklis</MenuLink>
        <MenuLink>Modifikavimas</MenuLink>
        <MenuLink>Priežiūra</MenuLink>
        <MenuLink>Ratai</MenuLink>
        <MenuLink>Kita</MenuLink>
      </Flex>
      <Flex alignItems="center">
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<DownIcon boxSize={2} color="#4F5665" transition="all 0.2s" />}
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
            minWidth="80px"
          >
            <MenuOptionGroup defaultValue="LT" type="radio">
              <MenuOption value="LT" country="LT" />
              <MenuOption value="EN" country="US" />
              <MenuOption value="RU" country="RU" />
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
  )
}

export default Header
