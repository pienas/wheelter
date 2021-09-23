import { Flex, Link as ChakraLink, Heading, Text, Box, Grid } from "@chakra-ui/react"
import { Link, Image, Routes } from "blitz"
import FacebookIcon from "app/core/components/icons/FacebookIcon"
import InstagramIcon from "app/core/components/icons/InstagramIcon"

type IconProps = {
  link: string
  icon: React.ReactNode
}

const Icon = ({ link, icon }: IconProps) => {
  return (
    <Link href={link} passHref>
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
          {icon}
        </Box>
      </ChakraLink>
    </Link>
  )
}

type FooterLinkProps = {
  link: string
  children: React.ReactNode
}

const FooterLink = ({ link, children }: FooterLinkProps) => {
  return (
    <Link href={link} passHref>
      <Text fontSize="sm" cursor="pointer" _hover={{ color: "brand.500" }} color="text" mb={3}>
        {children}
      </Text>
    </Link>
  )
}

const Footer = () => {
  return (
    <Flex backgroundColor="gray" justifyContent="center">
      <Grid templateColumns="1fr 1fr 1fr 1fr 1fr" width="1520px" py={12}>
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
            <Icon link="/" icon={<FacebookIcon boxSize={6} />} />
            <Icon link="/" icon={<InstagramIcon boxSize={6} />} />
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
          <FooterLink link="/">Kodėl verta būti klientu?</FooterLink>
          <FooterLink link="/">Naujienos</FooterLink>
          <FooterLink link="/">Atsiliepimai</FooterLink>
          <FooterLink link="/">Užsisakyk naujienlaiškį</FooterLink>
        </Flex>
        <Flex flexDirection="column">
          <Heading fontSize="md" as="h5" fontWeight="600" mb={6}>
            Paslaugų teikėjams
          </Heading>
          <FooterLink link="/">Wheelter paslaugų teikėjams</FooterLink>
          <FooterLink link="/">Naujienos</FooterLink>
        </Flex>
        <Flex flexDirection="column">
          <Heading fontSize="md" as="h5" fontWeight="600" mb={6}>
            Wheelter
          </Heading>
          <FooterLink link="/">Apie mus</FooterLink>
          <FooterLink link="/">Teisinės nuostatos</FooterLink>
          <FooterLink link="/">Sausainiukų nustatymai</FooterLink>
          <FooterLink link="/">Klientų pagalbos centras</FooterLink>
        </Flex>
      </Grid>
    </Flex>
  )
}

export default Footer
