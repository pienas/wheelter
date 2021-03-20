import { Image, Link, useMutation, useRouterQuery } from "blitz"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import resetPassword from "app/auth/mutations/resetPassword"
import { ResetPassword } from "app/auth/validations"
import { Box, Flex, Heading } from "@chakra-ui/react"

type ResetPasswordFormProps = {
  onSuccess?: () => void
}

export const ResetPasswordForm = (props: ResetPasswordFormProps) => {
  const query = useRouterQuery()
  const [resetPasswordMutation] = useMutation(resetPassword)

  return (
    <Flex flexDirection="column" justifyContent="center" alignItems="center" height="100vh">
      <Box cursor="pointer" margin="0 auto" width="112.5px" mb={4}>
        <Link href="/">
          <Image src="/logo-no-text.svg" height="102.375px" width="112.5px" alt="Wheelter logo" />
        </Link>
      </Box>
      <Heading as="h1" mb={1}>
        Atstatykite slaptažodį
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
          submitText="Pakeisti slaptažodį"
          schema={ResetPassword.omit({ token: true })}
          initialValues={{ password: "", passwordConfirmation: "" }}
          onSubmit={async (values) => {
            try {
              await resetPasswordMutation({ ...values, token: query.token as string })
              props.onSuccess?.()
            } catch (error) {
              return { [FORM_ERROR]: "Apgailestaujame, kažkas nepavyko. Pamėginkite dar kartą." }
            }
          }}
        >
          <Heading as="h3" size="lg" mb={6}>
            Slaptažodžio atstatymas
          </Heading>
          <LabeledTextField
            name="password"
            label="Naujas slaptažodis"
            placeholder="Įveskite naują slaptažodį"
            type="password"
            className="registerFormInput"
            required
          />
          <LabeledTextField
            name="password"
            label="Naujo slaptažodžio patvirtinimas"
            placeholder="Pakartokite naują slaptažodį"
            type="password"
            className="registerFormInput"
            required
          />
        </Form>
      </Box>
    </Flex>
  )
}

export default ResetPasswordForm
