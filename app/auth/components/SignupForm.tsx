import { Image, Link, useMutation } from "blitz"
import { LabeledTextField } from "app/core/components/form/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/form/Form"
import signup from "app/auth/mutations/signup"
import { Signup } from "app/auth/validations"
import { Box, Flex, Heading } from "@chakra-ui/react"

type SignupFormProps = {
  onSuccess?: () => void
}

export const SignupForm = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup)

  return (
    <Flex flexDirection="column" justifyContent="center" alignItems="center" height="100vh">
      <Box cursor="pointer" margin="0 auto" width="112.5px" mb={4}>
        <Link href="/" passHref>
          <Image src="/logo-no-text.svg" height="102.375px" width="112.5px" alt="Wheelter logo" />
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
      >
        <Form
          submitText="Registruotis"
          schema={Signup}
          initialValues={{ name: "", surname: "", email: "", phone: "", password: "" }}
          onSubmit={async (values) => {
            try {
              await signupMutation(values)
              props.onSuccess?.()
            } catch (error) {
              if (error.code === "P2002" && error.meta?.target?.includes("email")) {
                return { email: "Šis el. pašto adresas jau užregistruotas." }
              } else if (error.code === "P2002" && error.meta?.target?.includes("phone")) {
                return { phone: "Šis telefono numeris jau užregistruotas." }
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
            className="registerFormInput"
            required
          />
        </Form>
        <Flex flexDirection="column" alignItems="center">
          <Link href="/login" passHref>
            <a className="registerLink">Jau turite paskyrą? Prisijunkite.</a>
          </Link>
        </Flex>
      </Box>
      <Link href="/" passHref>
        <a className="registerLink back">Grįžti į pradinį puslapį</a>
      </Link>
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
