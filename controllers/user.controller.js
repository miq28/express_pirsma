
// const { PrismaClient } = require('@prisma/client')
// const prisma = new PrismaClient()
// const User = prisma.user
// const Role = prisma.role

const {
    GetAllUsers,
    GetUserById,
    GetUserByUsername,
    GetUserByEmail,
    CreateUser
} = require('../services/user.services')

const { isEmptyObject } = require("../utils")
const bcrypt = require("bcryptjs");
const { GenerateJwtToken } = require('../auth/auth.jwt.js');

// Retrieve all Tutorials from the database.
exports.getAll = async (req, res) => {
    try {
        const data = await GetAllUsers()
        res.send(data);
    } catch (err) {
        res.status(400).send({
            message:
                err.message || "Some error occurred while retrieving users."
        });
    }
};

exports.getOne = async (req, res) => {
    console.log(req.body.id)
    const id = parseInt(req.body.id);
    var condition = id ? { id: id } : null;

    try {
        const data = await GetUserById(id)
        if (data) return res.send(data)
        message = `User with id [${id}] not exist`
        return res.status(400).send({ message: message })
    } catch (err) {
        console.log(err)
        message = err.meta.cause
        res.status(400).send({ err: message });
    }
};

exports.register = async (req, res) => {
    try {
        console.log(req.body)
        // Get user input
        let {
            username,
            name,
            email,
            password,
            roleId
        } = req.body;

        if (roleId) {
            roleId = Number(roleId)
        } else roleId = 3 // defaulted to basic user

        // check if user already exist
        const oldEmail = await GetUserByEmail(email);
        const oldUsername = await GetUserByUsername(username);

        if (oldEmail || oldUsername) {
            return res.status(409).send("username or email has been used. Please use other email address");
        }

        //Encrypt user password
        encryptedPassword = await bcrypt.hash(password, 10);

        // Create user in our database
        const userToCreate = {
            username,
            name,
            email,
            password: encryptedPassword,
            roleId: roleId,
        }
        const newdata = await CreateUser (userToCreate)


        // Generate Jwt Token
        const payload = {
            id: newdata.id,
            username,
            name,
            email,
            roleId: newdata.roleId,
        }

        const { accessToken, refreshToken } = GenerateJwtToken(payload)

        // return new user
        res.cookie('accessToken', accessToken)
        res.cookie('refreshToken', refreshToken)
        return res.status(200).send({
            user: newdata,
            accessToken: accessToken,
            refreshToken: refreshToken
        })
    } catch (err) {
        console.log(err);
        res.status(400).send(err.message);
    }
};

// User sign-in choose
exports.login = async (req, res) => {
    try {
        console.log(req.body)
        // console.log(req)
        // Get user input
        const {
            username,
            password
        } = req.body;

        // Validate user input
        if (!(username && password)) {
            return res.status(401).send("All input is required");
        }

        // check if user already exist
        const dbData = await User.findUnique({ where: { username: username } }) ||
            await User.findUnique({ where: { email: username } });
        // const dataPassword = await User.findUnique({ where: { password: password } });


        if (!dbData) {
            return res.status(401).send("Incorrect username or password. Unauthorized.");
        }

        //check password
        const passwordIsValid = bcrypt.compareSync(
            password,
            dbData.password
        );

        if (!passwordIsValid) {
            return res.status(401).send("Incorrect username or password. Unauthorized.");
        }

        const payload = {
            id: dbData.id,
            username,
            roleId: dbData.roleId,
        }

        const { accessToken, refreshToken } = GenerateJwtToken(payload)

        // return new user
        res.cookie('accessToken', accessToken)
        res.cookie('refreshToken', refreshToken)
        return res.status(200).send({
            user: dbData,
            accessToken: accessToken,
            refreshToken: refreshToken
        })
    } catch (err) {
        console.log(err);
        res.status(400).send(err.message);
    }
}

exports.delete = async (req, res) => {
    console.log(req.body.id)
    const id = parseInt(req.body.id);
    var condition = id ? { id: id } : null;

    try {
        const data = await User.delete({
            where: condition,
            // include: {
            //   photo: true
            // }
        });
        if (data) return res.send(`User [${data.name}] deleted`)
        return res.status(400).send('User not exist')
    } catch (err) {
        const message = err.meta.cause
        res.status(400).send(message);
    }
};

// User sign-in
exports.authEmail = async (req, res) => {
    // Our login logic starts here
    try {
        // Get user input
        // const { email, password } = req.body;

        // res.redirect('/protected');
        // res.status(200).send('OKKE');
        const user = req.user

        const payload = {
            id: user.id,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            district_id: user.district_id
        }

        let token_duration;

        if (req.body.token_duration && req.body.token_duration !== null) {
            token_duration = Number(req.body.token_duration)
        } else token_duration = process.env.ACCESS_TOKEN_EXPIRE

        const { accessToken } = GenerateToken(payload, token_duration)

        // Create user in our database
        const storedRefreshToken = await RefreshToken.createToken(
            // {
            //     token: refreshToken
            // }
            payload
        );

        console.log(storedRefreshToken)


        // res.status(200).send({user, token}).redirect('/protected');
        // res.set('x-token', token);
        // return res.redirect(200, '/protected');
        // res.header('Access-Control-Allow-Origin', req.headers.origin);


        res.cookie('accessToken', accessToken)
        res.cookie('refreshToken', storedRefreshToken)
        // res.cookie('jwt', accessToken)
        return res.status(200).json({
            // user,
            accessToken: accessToken,
            refreshToken: storedRefreshToken
        })

        // res.send('OK')

    } catch (err) {
        console.log(err);
        return res.status(400).send({ err: err.message })
    }
    // Our register logic ends here

};


// User welcome
exports.welcome = (req, res) => {
    const second_expire = Math.round(req.user.exp - Date.now() / 1000)
    res.status(200).send({
        user: req.user,
        message: `Welcome ${req.user.first_name} 😁🤗🤡 <br>Your JWT token will expire in: ${second_expire} seconds`
    });
};

// Find a single Tutorial with an id
exports.render = async (req, res) => {
    try {
        const data = await User.findAll({ where: null, attributes: { exclude: ['password'] } })
        res.render('users.view.ejs', { users: data });
        // res.render('test.ejs', { users: data });  
    } catch (err) {
        res.status(400).send({
            message: err.message
        });
    }
};