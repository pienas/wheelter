// blitz.config.js
var {sessionMiddleware, simpleRolesIsAuthorized} = require("blitz");
module.exports = {
  middleware: [
    sessionMiddleware({
      isAuthorized: simpleRolesIsAuthorized
    })
  ],
  images: {
    domains: ["res.cloudinary.com"]
  }
};
