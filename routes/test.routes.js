const { verifyToken, GenerateJwtToken } = require('../auth/auth.jwt')
// require('../auth/auth.jwt')
// const passport = require('passport')

// applyPassportStrategy(passport)

module.exports = app => {
    const router = require("express").Router();

    router.get("/", async (req, res) => {
        return res.send('Home page')
    });

    router.get("/dashboard",
        verifyToken,
        async (req, res) => {
            return res.send('Dashboard page')
        }
    );

    router.get("/admin", async (req, res) => {
        return res.send('Admin page')
    });

    app.use('/',
        // authJwt,
        // verifyToken,
        // passport.authenticate('jwt', { session: false }),
        router
    );
}