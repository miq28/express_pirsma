const express = require('express')

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const app = express()
//var cors = require('cors')
const NODE_PORT = process.env.PORT || process.env.NODE_PORT || 8000
//const cookieParser = require('cookie-parser')
//app.use(cookieParser())

app.use(express.json())

require('./routes')(app)

app.listen(NODE_PORT, '0.0.0.0', () => {
  console.log(`
🚀 Server is listening on http://localhost:${NODE_PORT}
⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`);
});