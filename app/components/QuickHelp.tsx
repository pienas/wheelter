import { Box, Grid, Heading, useToast } from "@chakra-ui/react"
import Form from "app/core/components/Form"
import LabeledTextField from "app/core/components/LabeledTextField"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import getUserByPhone from "app/users/queries/getUserByPhone"
import { QuickHelpPhone } from "app/validations"
import { invoke, useRouter } from "blitz"
import { useRef } from "react"
import WarningToast from "./WarningToast"

const QuickHelp = () => {
  const toast = useToast()
  const toastIdRef = useRef()
  const router = useRouter()
  const currentUser = useCurrentUser()
  return (
    <Box borderRadius="10px" backgroundColor="brand.500" mb="30px" width="70vw">
      <Grid
        templateColumns="3fr 4.7fr"
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
        <Form
          submitText="PRAŠYTI PAGALBOS"
          schema={QuickHelpPhone}
          initialValues={{ phone: "" }}
          onSubmit={async (values) => {
            try {
              if (currentUser) {
                router.push("/success")
              } else {
                const userByPhone = await invoke(getUserByPhone, values.phone)
                if (userByPhone) router.push("/login")
                else router.push("/signup")
              }
            } catch (error) {
              console.log(error)
              toastIdRef.current = toast({
                duration: 3000,
                render: () => (
                  <WarningToast
                    heading="Kažkas netaip!"
                    text="Apgailestaujame, užklausos išsiųsti nepavyko. Pamėginkite dar kartą."
                    id={toastIdRef.current}
                  />
                ),
              })
            }
          }}
        >
          <LabeledTextField
            name="phone"
            placeholder="Įveskite savo telefono numerį"
            type="tel"
            required
          />
          {/* <InputGroup>
            <InputLeftAddon
              children="+370"
              color="brand.500"
              fontWeight="500"
              fontSize="14px"
              background="white"
              border="none"
              pointerEvents="none"
            />
            <Input
              backgroundColor="white"
              placeholder="Įveskite savo telefono numerį"
              variant="outline"
              color="brand.500"
              fontWeight="500"
              fontSize="14px"
              border="none"
              paddingLeft="0"
              _focus={{ border: "none", boxShadow: "none" }}
              type="tel"
              pattern="[0-9]{8}"
              required
            />
          </InputGroup> */}
          {/* <Button
            variant="solid"
            size="md"
            borderRadius="5px"
            backgroundColor="#a18fff"
            color="white"
            _hover={{ backgroundColor: "brand.400" }}
          >
            PRAŠYTI PAGALBOS
          </Button> */}
        </Form>
      </Grid>
    </Box>
  )
}

export default QuickHelp
