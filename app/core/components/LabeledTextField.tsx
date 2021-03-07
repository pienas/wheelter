import { forwardRef, PropsWithoutRef } from "react"
import { Field, useField } from "react-final-form"
import "react-phone-input-2/lib/style.css"
import { Text } from "@chakra-ui/react"
import PhoneInput from "react-phone-input-2"
import lt from "app/components/phoneLang.json"

export interface LabeledTextFieldProps extends PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  name: string
  label?: string
  type?: "text" | "password" | "email" | "tel" | "number"
  isPhone?: boolean
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
}

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
    required
    inputStyle={{
      borderRadius: "0.6rem",
      border: "0",
      appearance: "none",
      outline: "0",
      position: "relative",
      transition: "all 0.2s",
      paddingLeft: "0",
      paddingRight: "1rem",
      height: "2.5rem",
      background: "inherit",
      backgroundColor: "#eff0f7",
      borderTopLeftRadius: "0",
      borderBottomLeftRadius: "0",
      width: "calc(20rem - 3.375rem)",
      marginLeft: "3.375rem",
      paddingTop: "1px",
      fontFamily: "inherit",
      fontSize: "100%",
    }}
    buttonStyle={{
      fontSize: "0.875rem",
      paddingLeft: "0.5rem",
      paddingRight: "0.5rem",
      height: "2.5rem",
      borderRadius: "0.6rem 0 0 0.6rem",
      border: "0",
      background: "#eff0f7",
      marginRight: "-1px",
      flex: "0 0 auto",
      display: "flex",
      boxAlign: "center",
      alignItems: "center",
      whiteSpace: "nowrap",
      color: "#6500e6",
      fontWeight: "bolder",
      width: "calc(3.375rem)",
    }}
  />
)

export const LabeledTextField = forwardRef<HTMLInputElement, LabeledTextFieldProps>(
  ({ name, label, isPhone, outerProps, ...props }, ref) => {
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
        {!isPhone && <input {...input} disabled={submitting} {...props} ref={ref} />}
        {isPhone && (
          <div className="inputGroup">
            <Field
              name="phone"
              type="tel"
              component={PhoneInputComponent}
              pattern={/^([0-9]{7,15})$/m}
              disabled={submitting}
              {...props}
              ref={ref}
            />
          </div>
        )}
        {/* {touched && normalizedError && (
          <div role="alert" style={{ color: "red" }}>
            {normalizedError}
          </div>
        )} */}
        <style jsx>{`
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
