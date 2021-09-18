import { passportAuth } from "blitz"
import { Strategy } from "passport-google-oauth20"
import db from "db"

export default passportAuth({
  successRedirectUrl: "/",
  errorRedirectUrl: "/",
  strategies: [
    {
      authenticateOptions: { scope: "email profile" },
      strategy: new Strategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID as string,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
          callbackURL: process.env.GOOGLE_CALLBACK_URL as string
        },
        async (_token, _tokenSecret, profile, done) => {
          const email = profile.emails && profile.emails[0]?.value
          
          if (!email) {
            return done(
              new Error("Google OAuth 2.0 response doesn't have email."),
            )
          }

          const user = await db.user.upsert({
            where: { email },
            create: {
              avatarUrl: profile.photos ? profile.photos[0].value : "",
              name: profile.name?.givenName ?? "",
              surname: profile.name?.familyName ?? "",
              email: email.toLowerCase(),
              phone: "",
              role: "USER",
            },
            update: { email },
          });

          const publicData = {
            userId: user.id,
            roles: [user.role],
            source: "google",
          }
          done(undefined, { publicData, redirectUrl: '/' })
        })
    },
  ],
})