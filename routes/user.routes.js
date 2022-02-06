// const {authJwt} = require('../auth/auth.jwt.js')
const {authLocal} = require('../auth/auth.local')
//const cache = require('../cache')

module.exports = app => {
  const user = require("../controllers/user.controller.js");

  const router = require("express").Router();

  router.get("/", user.getAll);

  router.get("/get", user.getOne);

  // router.get("/welcome",
  //   authJwt.verifyToken,
  //   user.welcome
  // );

  router.post("/register", user.register);

  router.post("/login", user.login);

  router.delete("/delete", user.delete);

  router.post("/auth/email",
    authLocal,
    user.authEmail
  );

  app.use('/api/users',
    router
  );

};