import { Box, Grid, Heading, useToast } from "@chakra-ui/react"
import { Form as FinalForm, Field } from "react-final-form"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import getUserByPhone from "app/users/queries/getUserByPhone"
import { invoke, useRouter } from "blitz"
import { useRef } from "react"
import WarningToast from "./WarningToast"
import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/style.css"
import lt from "./phoneLang.json"

const PhoneInputComponent = ({ input }) => (
  <PhoneInput
    {...input}
    country={"lt"}
    enableSearch
    preferredCountries={["lt"]}
    searchNotFound="Šalis nerasta"
    searchPlaceholder="Paieška"
    localization={lt}
    placeholder="Įveskite savo telefono numerį"
  />
)

const QuickHelp = () => {
  const toast = useToast()
  const toastIdRef = useRef()
  const router = useRouter()
  const currentUser = useCurrentUser()
  const onSubmit = async (values) => {
    if (values.phone.length < 7 || values.phone.length > 15 || isNaN(values.phone)) {
      return (toastIdRef.current = toast({
        duration: 3000,
        render: () => (
          <WarningToast
            heading="Kažkas netaip!"
            text="Įveskite telefono numerį tinkamu formatu."
            id={toastIdRef.current}
          />
        ),
      }))
    }
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
  }
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
        <FinalForm
          onSubmit={onSubmit}
          initialValues={{ phone: "" }}
          render={({ handleSubmit, submitting }) => (
            <form onSubmit={handleSubmit} className="form">
              <div className="inputGroup">
                <Field
                  name="phone"
                  type="tel"
                  component={PhoneInputComponent}
                  pattern={/^([0-9]{11})$/m}
                />
              </div>
              <button type="submit" disabled={submitting}>
                PRAŠYTI PAGALBOS
              </button>
            </form>
          )}
        />
        {/* <Form
          submitText="PRAŠYTI PAGALBOS"
          schema={QuickHelpPhone}
          initialValues={{ phone: phone }}
          onSubmit={async () => {
            console.log(phone)
            try {
              if (currentUser) {
                router.push("/success")
              } else {
                const userByPhone = await invoke(getUserByPhone, phone)
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
          <div className="inputGroup">
            <PhoneInput
              country={"lt"}
              value={phone}
              onChange={setPhone}
              enableSearch
              preferredCountries={["lt"]}
              searchNotFound="Šalis nerasta"
              searchPlaceholder="Paieška"
              localization={lt}
            />
             <LabeledTextField
              name="phone"
              placeholder="Įveskite savo telefono numerį"
              type="tel"
              required
            /> *
          </div>
        </Form> */}
      </Grid>
    </Box>
  )
}

export default QuickHelp