import { Heading, Text, Box } from "@chakra-ui/react"
import { useQuery } from "blitz"
import getServicesCount from "app/partners/queries/getServicesCount"

const Services = () => {
  const [servicesCount] = useQuery(getServicesCount, {
    where: {
      isReviewed: true,
    },
  })
  return (
    <Box my={12}>
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
  )
}

export default Services
