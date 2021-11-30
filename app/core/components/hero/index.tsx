import { Flex, Heading, Text, Box } from "@chakra-ui/react"
import ShieldCheckIcon from "../icons/ShieldCheckIcon"
import RocketIcon from "../icons/RocketIcon"
import CheckCircleIcon from "../icons/CheckCircleIcon"
import { Image } from "blitz"

type BenefitProps = {
  heading: string
  text: string
  icon: React.ReactNode
}

const BrandText = ({ children }) => {
  return (
    <Text fontWeight="700" color="brand.500" display="inline">
      {children}
    </Text>
  )
}

const Benefit = ({ heading, text, icon }: BenefitProps) => {
  return (
    <Flex
      backgroundColor="#ffffff"
      maxWidth="md"
      boxShadow="0 0 30px 0 rgba(0, 0, 0, 10%)"
      borderRadius="10px"
      mb="20px"
      px="20px"
    >
      <Box backgroundColor="brand.500" borderRadius="100%" p="0.7rem" mr="20px" my="20px">
        {icon}
      </Box>
      <Box>
        <Heading as="h2" fontSize="lg" mt="15px">
          {heading}
        </Heading>
        <Text fontSize="sm" color="text" mt="5px">
          {text}
        </Text>
      </Box>
    </Flex>
  )
}

const Hero = () => {
  return (
    <Flex>
      <Box maxWidth="2xl">
        <Heading size="2xl" fontWeight="500" lineHeight="1.4">
          Rinkitės praktiškumą, <br />
          registruokitės su <BrandText>Wheelter</BrandText>.
        </Heading>
        <Heading
          as="h3"
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
        <Benefit
          heading="Greičiau"
          text="Vos kelių mygtukų paspaudimu išsirinkite geriausią paslaugos teikėją jūsų automobiliui."
          icon={<RocketIcon boxSize={8} color="white" />}
        />
        <Benefit
          heading="Patogiau"
          text="Vieta ir laikas nuo šiol nebe rodikliai."
          icon={<CheckCircleIcon boxSize={8} color="white" />}
        />
        <Benefit
          heading="Patikimiau"
          text="Matykite paslaugos teikėjo informaciją bei kaupkite savo automobilio istoriją išmaniai."
          icon={<ShieldCheckIcon boxSize={8} color="white" />}
        />
      </Box>
      <Box justifySelf="flex-end" alignSelf="center">
        <Image src="/illustration.svg" width="900px" height="532px" alt="Wheelter illustration" />
      </Box>
    </Flex>
  )
}

export default Hero
