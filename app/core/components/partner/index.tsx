import { Link as ChakraLink, Button, Heading, Text, Box, Grid } from "@chakra-ui/react"
import { Link } from "blitz"

const Partner = () => {
  return (
    <Box
      width="100vw"
      pb={12}
      background="linear-gradient(0deg, rgba(248,248,248,1) 50%, rgba(255,255,255,1) 50%)"
    >
      <Grid
        templateColumns="1fr 1fr"
        mx="200px"
        px="120px"
        py={16}
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
          <Link href="/partners/dashboard" passHref>
            <ChakraLink
              sx={{
                ":hover": {
                  textDecoration: "none",
                },
              }}
            >
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
            </ChakraLink>
          </Link>
        </Box>
      </Grid>
    </Box>
  )
}

export default Partner
