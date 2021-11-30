import { Image, Link, useMutation } from "blitz"
import { LabeledTextField } from "app/core/components/form/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/form/Form"
import createEmployeeFromToken from "app/partners/mutations/createEmployeeFromToken"
import { Box, Flex, Heading } from "@chakra-ui/react"
import { CreateEmployee } from "app/partners/validations"

type SignupFormProps = {
  token: string
  onSuccess?: () => void
}

export const SignupForm = ({ token, onSuccess }: SignupFormProps) => {
  const [createEmployeeFromTokenMutation] = useMutation(createEmployeeFromToken)

  return (
    <Flex flexDirection="column" justifyContent="center" alignItems="center" height="100vh">
      <Box cursor="pointer" margin="0 auto" width="135px" mb={4}>
        <Link href="/" passHref>
          <Image src="/logo.svg" alt="Wheelter logo" width="135px" height="120px" />
        </Link>
      </Box>
      <Heading as="h1" mb={1}>
        Užregistruokite savo paskyrą
      </Heading>
      <Heading as="h2" size="md" fontWeight="400" mb={12}>
        ir galėsite naudotis visomis puslapio funkcijomis
      </Heading>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        backgroundColor="#fff"
        borderRadius="0.375rem"
        padding="3rem 3rem 1.5rem 3rem"
        maxWidth="3.375rem"
      >
        <Form
          submitText="Registruotis"
          schema={CreateEmployee}
          initialValues={{
            name: "",
            surname: "",
            email: "",
            phone: "",
            password: "",
            passwordConfirmation: "",
            token,
          }}
          onSubmit={async (values) => {
            try {
              await createEmployeeFromTokenMutation(values)
              onSuccess?.()
            } catch (error) {
              if (error.code === "P2002" && error.meta?.target?.includes("email")) {
                return { email: "Šis el. pašto adresas jau užregistruotas." }
              } else if (error.code === "P2002" && error.meta?.target?.includes("phone")) {
                return { phone: "Šis telefono numeris jau užregistruotas." }
              } else if (error.name === "CreateEmployeeFromTokenError") {
                return { [FORM_ERROR]: error.message }
              } else {
                return { [FORM_ERROR]: "Apgailestaujame, kažkas nepavyko. Pamėginkite dar kartą." }
              }
            }
          }}
        >
          <Heading as="h3" size="lg" mb={6}>
            Registracija
          </Heading>
          <LabeledTextField
            name="name"
            className="registerFormInput"
            label="Vardas"
            placeholder="Įveskite savo vardą"
            required
          />
          <LabeledTextField
            name="surname"
            className="registerFormInput"
            label="Pavardė"
            placeholder="Įveskite savo pavardę"
            required
          />
          <LabeledTextField
            name="email"
            className="registerFormInput"
            label="El. paštas"
            placeholder="Įveskite savo el. paštą"
            type="email"
            required
          />
          <LabeledTextField
            name="phone"
            className="registerFormInput"
            label="Mob. tel. nr."
            placeholder="Įveskite savo telefono numerį"
            // pattern="/^([+]{1}[0-9]{7,15})$/m"
            isPhone
            required
          />
          <LabeledTextField
            name="password"
            label="Slaptažodis"
            placeholder="Įveskite savo slaptažodį"
            type="password"
            required
          />
          <LabeledTextField
            name="passwordConfirmation"
            label="Pakartokite slaptažodį"
            placeholder="Pakartokite savo slaptažodį"
            type="password"
            required
          />
        </Form>
        {/* <Link href="/login" passHref>
          <a className="registerLink">Jau turite paskyrą? Prisijunkite.</a>
        </Link> */}
      </Box>
      {/* <Link href="/" passHref>
        <a className="registerLink back">Grįžti į pradinį puslapį</a>
      </Link> */}
      <style jsx>
        {`
          .registerLink {
            transition: all 0.2s;
          }
          .registerLink:hover {
            color: #7700ff;
          }
          .registerLink.reset {
            margin-bottom: 0.15rem;
          }
          .registerLink.back {
            margin-top: 0.5rem;
          }
        `}
      </style>
    </Flex>
  )
}

export default SignupForm
