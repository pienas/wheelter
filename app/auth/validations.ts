import * as z from "zod"

const password = z.string().min(8).max(100)

export const Signup = z.object({
  name: z.string(),
  surname: z.string(),
  email: z.string().email(),
  phone: z.string().regex(/^([0-9]{7,15})$/m),
  password,
})

export const Login = z.object({
  email: z.string().email(),
  password: z.string(),
})

export const ForgotPassword = z.object({
  email: z.string().email(),
})

export const ResetPassword = z
  .object({
    password: password,
    passwordConfirmation: password,
    token: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ["passwordConfirmation"], // set the path of the error
  })

export const ChangePassword = z.object({
  currentPassword: z.string(),
  newPassword: password,
})
