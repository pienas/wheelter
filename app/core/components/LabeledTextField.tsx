import { forwardRef, PropsWithoutRef } from "react"
import { useField } from "react-final-form"
import "react-phone-input-2/lib/style.css"
import { Text } from "@chakra-ui/react"

export interface LabeledTextFieldProps extends PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  name: string
  label?: string
  type?: "text" | "password" | "email" | "tel" | "number"
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
}

export const LabeledTextField = forwardRef<HTMLInputElement, LabeledTextFieldProps>(
  ({ name, label, outerProps, ...props }, ref) => {
    const {
      input,
      meta: { error, submitError, submitting },
    } = useField(name, {
      parse: props.type === "number" ? Number : undefined,
    })
    // const normalizedError = Array.isArray(error) ? error.join(", ") : error || submitError

    return (
      <div {...outerProps} className="fullW">
        <Text mb={1}>{label}</Text>
        <input {...input} disabled={submitting} {...props} ref={ref} />
        {/* {touched && normalizedError && (
          <div role="alert" style={{ color: "red" }}>
            {normalizedError}
          </div>
        )} */}
        <style jsx>{`
          label {
            display: flex;
            flex-direction: column;
            align-items: start;
            font-size: 1rem;
          }
          .fullW {
            width: 100%;
          }
          input {
            background-color: #eff0f7;
            border-radius: 0.6rem;
            height: 2.5rem;
            width: 20rem;
            padding: 0 1rem;
            margin-bottom: 0.5rem;
          }
          input:focus,
          input:focus-visible {
            border: 1px solid #7000ff;
            outline: none;
          }
        `}</style>
      </div>
    )
  }
)

export default LabeledTextField
