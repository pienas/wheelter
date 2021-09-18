// blitz.config.js
var {sessionMiddleware, simpleRolesIsAuthorized} = require("blitz");
module.exports = {
  log: {
    level: "info"
  },
  middleware: [
    sessionMiddleware({
      isAuthorized: simpleRolesIsAuthorized
    })
  ],
  images: {
    domains: ["res.cloudinary.com"]
  }
};
