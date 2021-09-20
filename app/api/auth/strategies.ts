import { Strategy as GoogleStrategy } from "passport-google-oauth20"
import { Strategy as FacebookStrategy } from "passport-facebook"
import db from "db"

export const google = {
  authenticateOptions: { scope: "email profile" },
  strategy: new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: process.env.GOOGLE_CALLBACK_URL as string,
    },
    async (_token, _tokenSecret, profile, done) => {
      const email = profile.emails && profile.emails[0]?.value

      if (!email) {
        return done(new Error("Google OAuth 2.0 response doesn't have email."))
      }

      const user = await db.user.upsert({
        where: { email },
        create: {
          avatarUrl: profile.photos ? profile.photos[0].value : "",
          name: profile.name?.givenName ?? "",
          surname: profile.name?.familyName ?? "",
          email: email.toLowerCase(),
          role: "USER",
        },
        update: { email },
      })

      const publicData = {
        userId: user.id,
        roles: [user.role],
        source: "google",
      }
      done(undefined, { publicData, redirectUrl: "/" })
    }
  ),
}

export const facebook = {
  authenticateOptions: { scope: "email public_profile" },
  strategy: new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID as string,
      clientSecret: process.env.FACEBOOK_APP_SECRET as string,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL as string,
      profileFields: ["name", "photos", "email"],
    },
    async (_token, _tokenSecret, profile, done) => {
      const email = profile.emails && profile.emails[0]?.value

      if (!email) {
        return done(new Error("Facebook response doesn't have email."))
      }

      const user = await db.user.upsert({
        where: { email },
        create: {
          avatarUrl: profile.photos ? profile.photos[0].value : "",
          name: profile.name?.givenName ?? "",
          surname: profile.name?.familyName ?? "",
          email: email.toLowerCase(),
          role: "USER",
        },
        update: { email },
      })

      const publicData = {
        userId: user.id,
        roles: [user.role],
        source: "facebook",
      }
      done(undefined, { publicData, redirectUrl: "/" })
    }
  ),
}
