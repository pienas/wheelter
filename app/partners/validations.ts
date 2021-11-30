import { z } from "zod"

const password = z.string().min(8).max(100)

export const CreateInviteToken = z.object({
  id: z.number().int(),
  userId: z.number().int(),
})

export const CreateEmployee = z
  .object({
    name: z.string(),
    surname: z.string(),
    email: z.string().email(),
    phone: z.string().regex(/^([0-9]{7,15})$/m),
    password: password,
    passwordConfirmation: password,
    token: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Slaptažodžiai nesutampa",
    path: ["passwordConfirmation"],
  })
