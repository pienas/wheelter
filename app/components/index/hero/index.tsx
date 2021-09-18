import { Flex, Heading, Text, Box } from "@chakra-ui/react"
import TrustworthyIcon from "../icons/TrustworthyIcon"
import FastIcon from "../icons/FastIcon"
import ReliableIcon from "../icons/ReliableIcon"
import { Image } from "blitz"

const BrandText = ({ children }) => {
  return (
    <Text fontWeight="700" color="brand.500" display="inline">
      {children}
    </Text>
  )
}

const Hero = () => {
  return (
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
  )
}

export default Hero
