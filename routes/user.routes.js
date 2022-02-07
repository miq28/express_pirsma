const { authJwt } = require('../auth/auth.jwt.js')
const { ValidateRegisterUser, CheckValidatorResult } = require('../validator')
//const cache = require('../cache')

module.exports = app => {
  const user = require("../controllers/user.controller.js");

  const router = require("express").Router();

  router.get("/", user.getAll);

  router.get("/get", user.getOne);

  router.post("/register",
    ValidateRegisterUser,
    CheckValidatorResult,

    user.register
  );

  router.post("/login", user.login);

  router.delete("/delete", user.delete);

  app.use('/api/users',
    router
  );

};