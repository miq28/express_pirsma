const authJwt = require('../auth/auth.jwt')
const authLocal = require('../auth/auth.local')
//const cache = require('../cache')

module.exports = app => {
  const user = require("../controllers/user.controller.js");

  const router = require("express").Router();

  router.get("/", user.findAll);

  router.get("/welcome",
    authJwt.verifyToken,
    user.welcome
  );

  router.post("/signup", user.signup);

  router.post("/signin", user.signin);

  router.post("/auth/email",
    authLocal,
    user.authEmail
  );


  app.use('/api/users',
    router);
};