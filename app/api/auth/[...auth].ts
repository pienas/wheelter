import { passportAuth } from "blitz"
import { facebook, google } from "./strategies"

export default passportAuth({
  successRedirectUrl: "/",
  errorRedirectUrl: "/",
  strategies: [
    google,
    facebook
  ],
})