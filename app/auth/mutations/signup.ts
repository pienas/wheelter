import { resolver, SecurePassword } from "blitz"
import db from "db"
import { Signup } from "app/auth/validations"
import { Role } from "types"

export default resolver.pipe(
  resolver.zod(Signup),
  async ({ name, surname, email, phone, password }, ctx) => {
    const hashedPassword = await SecurePassword.hash(password)
    const user = await db.user.create({
      data: {
        name: name,
        surname: surname,
        email: email.toLowerCase(),
        phone: phone,
        hashedPassword,
        role: "USER",
      },
      select: { id: true, name: true, surname: true, email: true, phone: true, role: true },
    })

    await ctx.session.$create({ userId: user.id, role: user.role as Role })
    return user
  }
)
