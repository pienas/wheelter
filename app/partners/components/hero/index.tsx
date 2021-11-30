import { Flex, Heading, Text, Button, Link as ChakraLink, Box } from "@chakra-ui/react"
import GiftIcon from "app/core/components/icons/GiftIcon"
import { Image, Link } from "blitz"

const BrandText = ({ children }) => {
  return (
    <Text fontWeight="700" color="brand.500" display="inline">
      {children}
    </Text>
  )
}

const Hero = () => {
  return (
    <Flex direction="column">
      <Flex alignItems="center" justifyContent="space-between" height="3xl">
        <Box maxWidth="2xl">
          <Flex
            fontSize="xs"
            color="#8C929F"
            fontWeight="500"
            textTransform="uppercase"
            mb="5px"
            as="h4"
          >
            <GiftIcon boxSize={4} mr={1} /> Nemokama versija 3 mėnesiams
          </Flex>
          <Heading size="2xl" fontWeight="500" lineHeight="1.4">
            Valdyk šiuolaikiškai - <br />
            naudokis <BrandText>Wheelter</BrandText>.
          </Heading>
          <Heading
            as="h3"
            fontSize="md"
            mt="1rem"
            color="text"
            mb="30px"
            fontWeight="400"
            lineHeight="2"
          >
            Autopaslaugų valdymo įrankiai vienoje vietoje.
            <br />
            Leisk klientui atrasti tavo teikiamas paslaugas išmaniai.
          </Heading>
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
                width={64}
                height={14}
                borderRadius="10px"
                fontWeight="600"
                boxShadow="0 5px 15px 0 rgb(100 0 230 / 30%)"
                mr="25px"
                _hover={{ backgroundColor: "brand.400" }}
              >
                Išbandykite nemokamai
              </Button>
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
                backgroundColor="transparent"
                border="2px solid"
                borderColor="text"
                color="text"
                width={48}
                height={14}
                borderRadius="10px"
                fontWeight="600"
              >
                Kaip tai veikia?
              </Button>
            </ChakraLink>
          </Link>
        </Box>
        <Box justifySelf="flex-end" alignSelf="center">
          <Image
            src="/illustration-partners.svg"
            width="700px"
            height="430px"
            alt="Wheelter illustration"
          />
        </Box>
      </Flex>
    </Flex>
  )
}

export default Hero
