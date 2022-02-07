const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const User = prisma.user
const Role = prisma.role

async function GetAllUsers(id) {
    return await User.findMany();
}

async function GetUserById(id) {
    return await User.findUnique({ where: { id: id } });
}

async function GetUserByUsername(userName) {
    return await User.findUnique({ where: { username: userName } });
}

async function GetUserByEmail(email) {
    return await User.findUnique({ where: { email: email } });
}

async function CreateUser(payload) {
    const {
        username,
        name,
        email,
        password,
        roleId
    } = payload
    
    return await User.create({
        data: {
            username,
            name,
            email,
            password,
            roleId
        }
    })
}

module.exports = {
    GetAllUsers,
    GetUserById,
    GetUserByUsername,
    GetUserByEmail,
    CreateUser
}