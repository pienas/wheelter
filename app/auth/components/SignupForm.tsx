import { useMutation } from "blitz"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import signup from "app/auth/mutations/signup"
import { Signup } from "app/auth/validations"

type SignupFormProps = {
  onSuccess?: () => void
}

export const SignupForm = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup)

  return (
    <div>
      <h1>Create an Account</h1>

      <Form
        submitText="Sukurti paskyrą"
        schema={Signup}
        initialValues={{ name: "", surname: "", email: "", phone: "", password: "" }}
        onSubmit={async (values) => {
          try {
            await signupMutation(values)
            props.onSuccess?.()
          } catch (error) {
            if (error.code === "P2002" && error.meta?.target?.includes("email")) {
              // This error comes from Prisma
              return { email: "This email is already being used" }
            } else if (error.code === "P2002" && error.meta?.target?.includes("phone")) {
              // This error comes from Prisma
              return { phone: "This phone is already being used" }
            } else {
              return { [FORM_ERROR]: error.toString() }
            }
          }
        }}
      >
        <LabeledTextField name="name" label="Vardas" placeholder="Vardas" type="text" required />
        <LabeledTextField
          name="surname"
          label="Pavardė"
          placeholder="Pavardė"
          type="text"
          required
        />
        <LabeledTextField
          name="email"
          label="El. paštas"
          placeholder="El. paštas"
          type="email"
          required
        />
        <LabeledTextField
          name="phone"
          label="Mob. tel. nr."
          placeholder="Mob. tel. nr."
          type="tel"
          required
        />
        <LabeledTextField
          name="password"
          label="Slaptažodis"
          placeholder="Slaptažodis"
          type="password"
          required
        />
      </Form>
    </div>
  )
}

export default SignupForm
