import { Form, FormProps } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import * as z from "zod"
export { FORM_ERROR } from "app/core/components/Form"

export function PartnerForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <LabeledTextField name="name" label="Name" placeholder="Name" />
      <LabeledTextField name="description" label="Description" placeholder="Description" />
      <LabeledTextField name="email" label="Email" placeholder="Email" />
      <LabeledTextField name="phone" label="Phone" placeholder="Phone" />
      <LabeledTextField name="avatarUrl" label="Avatar URL" placeholder="Avatar URL" />
    </Form>
  )
}
