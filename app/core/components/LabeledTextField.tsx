import { forwardRef, PropsWithoutRef, useState } from "react"
import { useField } from "react-final-form"
import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/style.css"
import lt from "app/components/phoneLang.json"

export interface LabeledTextFieldProps extends PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  name: string
  label: string
  type?: "text" | "password" | "email" | "tel" | "number"
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
}

export const LabeledTextField = forwardRef<HTMLInputElement, LabeledTextFieldProps>(
  ({ name, label, outerProps, ...props }, ref) => {
    const {
      input,
      meta: { touched, error, submitError, submitting },
    } = useField(name, {
      parse: props.type === "number" ? Number : undefined,
    })
    const normalizedError = Array.isArray(error) ? error.join(", ") : error || submitError

    return (
      <div {...outerProps} className="fullW">
        <label>
          {label}
          <input {...input} disabled={submitting} {...props} ref={ref} />
        </label>
        {touched && normalizedError && (
          <div role="alert" style={{ color: "red" }}>
            {normalizedError}
          </div>
        )}
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
        `}</style>
      </div>
    )
  }
)

export default LabeledTextField
