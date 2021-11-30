import { Flex, Heading, Text, Link as ChakraLink, Button, Grid, Box } from "@chakra-ui/react"
import { TabList, Tabs } from "@chakra-ui/tabs"
import CustomTabIndex from "../customTab/CustomTabIndex"
import { useState } from "react"
import { Link } from "blitz"
import CheckIcon from "app/core/components/icons/CheckIcon"
import CrossIcon from "app/core/components/icons/CrossIcon"
import InfinityIcon from "app/core/components/icons/InfinityIcon"

type PlanProps = {
  yearlySelected: boolean
  name: string
  hasTag: boolean
  priceMonthly: string
  priceYearly: string
  objectsText: string
  isPrimary: boolean
  hasFreeVersion: boolean
}

type ButtonProps = {
  text: string
  link: string
}

type RowProps = {
  benefit: string
  basic: boolean | string
  smart: boolean | string | number
  individual: boolean | string | number
  isLastRow: boolean
}

const PrimaryButton = ({ text, link }: ButtonProps) => {
  return (
    <Link href={link} passHref>
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
          width={72}
          height={14}
          borderRadius="10px"
          fontWeight="600"
          boxShadow="0 5px 15px 0 rgb(100 0 230 / 30%)"
          _hover={{ backgroundColor: "brand.400" }}
        >
          {text}
        </Button>
      </ChakraLink>
    </Link>
  )
}

const SecondaryButton = ({ text, link }: ButtonProps) => {
  return (
    <Link href={link} passHref>
      <ChakraLink
        sx={{
          ":hover": {
            textDecoration: "none",
          },
        }}
      >
        <Button
          backgroundColor="transparent"
          color="text"
          width={72}
          height={14}
          borderRadius="10px"
          fontWeight="600"
          border="2px solid"
          borderColor="text"
        >
          {text}
        </Button>
      </ChakraLink>
    </Link>
  )
}

const Row = ({ benefit, basic, smart, individual, isLastRow }: RowProps) => {
  return (
    <Grid
      templateColumns="repeat(4, 1fr)"
      width="7xl"
      height="50px"
      borderBottom={isLastRow ? "none" : "1px solid #E7E7E7"}
      mb={isLastRow ? "50px" : "0"}
      cursor="pointer"
      _hover={{ backgroundColor: "#f8f8f8" }}
    >
      <Flex alignItems="center" justifyContent="flex-start" borderRight="1px solid #E7E7E7">
        <Text color="text" fontSize="lg">
          {benefit}
        </Text>
      </Flex>
      {basic ? (
        typeof basic === "string" ? (
          <Flex alignItems="center" justifyContent="center" borderRight="1px solid #E7E7E7">
            <Text color="text">{basic}</Text>
          </Flex>
        ) : (
          <Flex alignItems="center" justifyContent="center" borderRight="1px solid #E7E7E7">
            <CheckIcon boxSize={6} color="green.300" />
          </Flex>
        )
      ) : (
        <Flex alignItems="center" justifyContent="center" borderRight="1px solid #E7E7E7">
          <CrossIcon boxSize={6} color="red.500" />
        </Flex>
      )}
      {smart ? (
        typeof smart === "string" ? (
          <Flex alignItems="center" justifyContent="center" borderRight="1px solid #E7E7E7">
            <Text color="text">{smart}</Text>
          </Flex>
        ) : typeof smart === "boolean" ? (
          <Flex alignItems="center" justifyContent="center" borderRight="1px solid #E7E7E7">
            <CheckIcon boxSize={6} color="green.300" />
          </Flex>
        ) : (
          <Flex alignItems="center" justifyContent="center" borderRight="1px solid #E7E7E7">
            <InfinityIcon boxSize={5} color="text" />
          </Flex>
        )
      ) : (
        <Flex alignItems="center" justifyContent="center" borderRight="1px solid #E7E7E7">
          <CrossIcon boxSize={6} color="red.500" />
        </Flex>
      )}
      {individual ? (
        typeof individual === "string" ? (
          <Flex alignItems="center" justifyContent="center">
            <Text color="text">{individual}</Text>
          </Flex>
        ) : typeof individual === "boolean" ? (
          <Flex alignItems="center" justifyContent="center">
            <CheckIcon boxSize={6} color="green.300" />
          </Flex>
        ) : (
          <Flex alignItems="center" justifyContent="center">
            <InfinityIcon boxSize={5} color="text" />
          </Flex>
        )
      ) : (
        <Flex alignItems="center" justifyContent="center">
          <CrossIcon boxSize={6} color="red.500" />
        </Flex>
      )}
    </Grid>
  )
}

const Plan = ({
  yearlySelected,
  name,
  hasTag,
  priceMonthly,
  priceYearly,
  objectsText,
  isPrimary,
  hasFreeVersion,
}: PlanProps) => {
  return (
    <Flex direction="column" alignItems="center" maxWidth={yearlySelected ? "360px" : "305px"}>
      <Flex alignSelf="flex-start" alignItems="center">
        <Heading as="h3" fontSize="3xl" color="black" fontWeight="500" mb="5px">
          {name}
        </Heading>
        {hasTag && (
          <Flex
            backgroundColor="brand.50"
            width="150px"
            height="20px"
            borderRadius="3px"
            color="white"
            pt="2px"
            textTransform="uppercase"
            letterSpacing="1.5px"
            alignItems="center"
            justifyContent="center"
            fontSize="10px"
            fontWeight="500"
            ml="30px"
          >
            Rekomenduojame
          </Flex>
        )}
      </Flex>
      <Flex alignItems="flex-end" alignSelf="flex-start">
        <Heading as="h3" fontSize="5xl" color="black" fontWeight="500">
          {yearlySelected ? priceYearly : priceMonthly} €
        </Heading>
        <Text color="#8C96AB" fontWeight="500" fontSize="xl" ml="5px">
          {yearlySelected ? " metams" : "/ mėn"}
        </Text>
      </Flex>
      <Text color="black" fontSize="lg" mb="20px" alignSelf="flex-start">
        {objectsText.endsWith("objektų") && <InfinityIcon boxSize={5} />} {objectsText}
      </Text>
      {isPrimary ? (
        <PrimaryButton text={hasFreeVersion ? "Išbandykite nemokamai" : "Susisiekite*"} link="/" />
      ) : (
        <SecondaryButton
          text={hasFreeVersion ? "Išbandykite nemokamai" : "Susisiekite*"}
          link="/"
        />
      )}
      {hasFreeVersion && (
        <Text textTransform="uppercase" fontSize="sm" color="#8C96AB" fontWeight="600" mt="5px">
          Nemokama versija 3 mėnesiams
        </Text>
      )}
    </Flex>
  )
}

const SelectPlan = () => {
  const [isYearlySelected, setIsYearlySelected] = useState(false)

  const handleTabsChange = (index) => {
    setIsYearlySelected(index)
  }

  return (
    <Flex direction="column" justifyContent="center" alignItems="center">
      <Heading fontSize="6xl" color="black" fontWeight="600" as="h2">
        Pasirinkite planą
      </Heading>
      <Text color="text" mt="10px">
        Jokių papildomų mokesčių. Atšaukite bet kada.
      </Text>
      <Flex alignItems="center">
        <Text color="text" mr="10px">
          Mokėkite kas
        </Text>
        <Tabs
          variant="unstyled"
          isFitted
          background="#F2F4FA"
          p="3px"
          borderRadius="10px"
          my="15px"
          onChange={handleTabsChange}
        >
          <TabList>
            <CustomTabIndex>mėnesį</CustomTabIndex>
            <CustomTabIndex>metus</CustomTabIndex>
          </TabList>
        </Tabs>
      </Flex>
      <Grid templateColumns="repeat(4, 1fr)" width="7xl" justifyItems="center" mb="30px">
        <Box></Box>
        <Plan
          yearlySelected={isYearlySelected}
          name="Bazinis"
          hasTag={false}
          priceMonthly="19.99"
          priceYearly="199.99"
          objectsText="1 aptarnaujančiam objektui"
          isPrimary={false}
          hasFreeVersion={true}
        />
        <Plan
          yearlySelected={isYearlySelected}
          name="Išmanus"
          hasTag={true}
          priceMonthly="29.99"
          priceYearly="299.99"
          objectsText="1 aptarnaujančiam objektui"
          isPrimary={true}
          hasFreeVersion={true}
        />
        <Plan
          yearlySelected={isYearlySelected}
          name="Individualus"
          hasTag={false}
          priceMonthly="*"
          priceYearly="*"
          objectsText="aptarnaujančių objektų"
          isPrimary={false}
          hasFreeVersion={false}
        />
      </Grid>
      <Row
        benefit="Momentiniai pranešimai"
        basic={true}
        smart={true}
        individual={true}
        isLastRow={false}
      />
      <Row
        benefit="Pagalbos centras"
        basic={true}
        smart={true}
        individual={true}
        isLastRow={false}
      />
      <Row
        benefit="Dalinimosi funkcija"
        basic={true}
        smart={true}
        individual={true}
        isLastRow={false}
      />
      <Row
        benefit="Interaktyvus kalendorius"
        basic={false}
        smart={true}
        individual={true}
        isLastRow={false}
      />
      <Row
        benefit="Lankomumo statistika"
        basic={false}
        smart={true}
        individual={true}
        isLastRow={false}
      />
      <Row
        benefit="Papildoma statistika"
        basic={false}
        smart={true}
        individual={true}
        isLastRow={false}
      />
      <Row
        benefit="Nuolaidų kodai"
        basic={false}
        smart={true}
        individual={true}
        isLastRow={false}
      />
      <Row
        benefit="Individualūs tikslai"
        basic={false}
        smart={true}
        individual={true}
        isLastRow={false}
      />
      <Row
        benefit="Individuali statistika"
        basic={false}
        smart={false}
        individual={true}
        isLastRow={false}
      />
      <Row benefit="Darbuotojų skaičius" basic="1" smart={99} individual={99} isLastRow={false} />
      <Row benefit="Nuotraukų skaičius" basic="3" smart="6" individual={99} isLastRow={true} />
    </Flex>
  )
}

export default SelectPlan
