import { Box, Button, Grid, Heading, Input } from "@chakra-ui/react"

const QuickHelp = () => {
  return (
    <Box borderRadius="10px" backgroundColor="brand.500" mb="30px" width="70vw">
      <Grid
        templateColumns="3fr 3fr 1.7fr"
        gap={10}
        pt="40px"
        pb="40px"
        pl="90px"
        pr="90px"
        display="grid"
        alignItems="center"
      >
        <Heading size="lg" color="white" mr="30px">
          Sugedo automobilis ir reikia skubios pagalbos?
        </Heading>
        <Input
          backgroundColor="white"
          placeholder="Įveskite savo telefono numerį"
          variant="outline"
          color="brand.500"
          fontWeight="500"
          fontSize="14px"
          position="relative"
          background='url("icon-phone.svg") no-repeat scroll 15px 10px'
          paddingLeft="45px"
        />
        <Button
          variant="solid"
          size="md"
          backgroundColor="#a18fff"
          color="white"
          _hover={{ backgroundColor: "brand.400" }}
        >
          PRAŠYTI PAGALBOS
        </Button>
      </Grid>
    </Box>
  )
}

export default QuickHelp
