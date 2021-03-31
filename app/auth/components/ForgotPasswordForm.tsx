import { Image, Link, useMutation } from "blitz"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import forgotPassword from "app/auth/mutations/forgotPassword"
import { ForgotPassword } from "app/auth/validations"
import { Box, Flex, Heading } from "@chakra-ui/react"

type ForgotPasswordFormProps = {
  onSuccess?: () => void
}

export const ForgotPasswordForm = (props: ForgotPasswordFormProps) => {
  const [forgotPasswordMutation] = useMutation(forgotPassword)

  return (
    <Flex flexDirection="column" justifyContent="center" alignItems="center" height="100vh">
      <Box cursor="pointer" margin="0 auto" width="112.5px" mb={4}>
        <Link href="/" passHref>
          <Image src="/logo-no-text.svg" height="102.375px" width="112.5px" alt="Wheelter logo" />
        </Link>
      </Box>
      <Heading as="h1" mb={1}>
        Pamiršote slaptažodį?
      </Heading>
      <Heading as="h2" size="md" fontWeight="400" mb={12}>
        Užpildykite formą ir gausite slaptažodžio atkūrimo instrukcijas
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
          submitText="Gauti instrukcijas"
          schema={ForgotPassword}
          initialValues={{ email: "" }}
          onSubmit={async (values) => {
            try {
              await forgotPasswordMutation(values)
              props.onSuccess?.()
            } catch (error) {
              return { [FORM_ERROR]: "Apgailestaujame, kažkas nepavyko. Pamėginkite dar kartą." }
            }
          }}
        >
          <Heading as="h3" size="lg" mb={6}>
            Slaptažodžio atkūrimas
          </Heading>
          <LabeledTextField
            name="email"
            className="registerFormInput"
            label="El. paštas"
            placeholder="Įveskite savo el. paštą"
            type="email"
            required
          />
        </Form>
        <Flex flexDirection="column" alignItems="center">
          <Link href="/login" passHref>
            <a className="forgotPasswordLink">Prisimenate slaptažodį? Prisijunkite.</a>
          </Link>
        </Flex>
      </Box>
      <Link href="/" passHref>
        <a className="forgotPasswordLink back">Grįžti į pradinį puslapį</a>
      </Link>
      <style jsx>
        {`
          .forgotPasswordLink {
            transition: all 0.2s;
          }
          .forgotPasswordLink:hover {
            color: #7700ff;
          }
          .forgotPasswordLink.reset {
            margin-bottom: 0.15rem;
          }
          .forgotPasswordLink.back {
            margin-top: 0.5rem;
          }
        `}
      </style>
    </Flex>
  )
}

export default ForgotPasswordForm
