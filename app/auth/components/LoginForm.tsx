import { AuthenticationError, Image, Link, useMutation } from "blitz"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import login from "app/auth/mutations/login"
import { Login } from "app/auth/validations"
import { Box, Flex, Heading } from "@chakra-ui/react"

type LoginFormProps = {
  onSuccess?: () => void
}

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login)

  return (
    <Flex flexDirection="column" justifyContent="center" alignItems="center" height="100vh">
      <Box cursor="pointer" margin="0 auto" width="112.5px" mb={4}>
        <Link href="/">
          <Image src="/logo-no-text.svg" height="102.375px" width="112.5px" alt="Wheelter logo" />
        </Link>
      </Box>
      <Heading as="h1" mb={1}>
        Prisijunkite prie savo paskyros
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
          submitText="Prisijungti"
          schema={Login}
          initialValues={{ email: "", password: "" }}
          onSubmit={async (values) => {
            try {
              await loginMutation(values)
              props.onSuccess?.()
            } catch (error) {
              if (error instanceof AuthenticationError) {
                return {
                  [FORM_ERROR]: "El. paštas arba slaptažodis neteisingas. Bandykite dar kartą.",
                }
              } else {
                return {
                  [FORM_ERROR]: "Apgailestaujame, kažkas nepavyko. Pamėginkite dar kartą.",
                }
              }
            }
          }}
        >
          {/* <Box cursor="pointer" margin="0 auto" width="50px" mb={4}>
            <Link href="/">
              <Image src="/logo-no-text.svg" height="34.125px" width="37.5px" alt="Wheelter logo" />
            </Link>
          </Box> */}
          <Heading as="h3" size="lg" mb={6}>
            Prisijungimas
          </Heading>
          <Flex>
            <LabeledTextField
              name="email"
              className="loginFormInput"
              label="El. paštas"
              placeholder="Įveskite savo el. paštą"
            />
          </Flex>
          <LabeledTextField
            name="password"
            label="Slaptažodis"
            placeholder="Įveskite savo slaptažodį"
            type="password"
            className="loginFormInput"
          />
        </Form>
        <Flex flexDirection="column" alignItems="center">
          <Link href="/forgot-password">
            <a className="loginLink reset">Pamiršote slaptažodį?</a>
          </Link>
          <Link href="/signup">
            <a className="loginLink">Neturite paskyros? Prisiregistruokite.</a>
          </Link>
          {/* <Box cursor="pointer" margin="0 auto" width="50px" mt={4}>
            <Link href="/">
              <Image src="/logo-no-text.svg" height="34.125px" width="37.5px" alt="Wheelter logo" />
            </Link>
          </Box> */}
        </Flex>
      </Box>
      <Link href="/">
        <a className="loginLink back">Grįžti į pradinį puslapį</a>
      </Link>

      <style jsx>
        {`
          .loginLink {
            transition: all 0.2s;
          }
          .loginLink:hover {
            color: #7700ff;
          }
          .reset {
            margin-bottom: 0.15rem;
          }
          .back {
            margin-top: 0.5rem;
          }
        `}
      </style>
    </Flex>
  )
}

export default LoginForm
