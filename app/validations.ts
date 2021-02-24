import * as z from "zod"

export const QuickHelpPhone = z.object({
  phone: z.string().regex(/^([0-9]{8})$/m),
})
