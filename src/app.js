const express = require('express')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
const app = express()

app.use(express.json())

app.post(`/signup`, async (req, res) => {
  const { nama, email, password } = req.body
  const result = await prisma.user.create({
    data: {
    nama,
    email,
    password,
    },
  })
  res.json(result)
})

app.post(`/post`, async (req, res) => {
    const { title, content, authorId } = req.body
    const result = await prisma.blog.create({
      data: {
      title,
      content,
      authorId,
      },
    })
    res.json(result)
  })

app.get(`/post/:id`, async (req, res) => {
    let id_string = req.params.id
    let id_number = parseInt(req.params.id)
    console.log("tanpa parse int",typeof(id_string)) //tanpa parse int -> string
   
    console.log("dengan parse int",typeof(id_number)) //  dengan parse int -> number
    const result = await prisma.blog.findUnique({
        where: {
            id: parseInt(req.params.id)
        },
        include: {
            author:true
        }
    })
    res.json(result)
  })
  app.delete(`/user/:id`, async (req, res) => {
    const result = await prisma.user.delete({
        where: {
            id: parseInt(req.params.id)
        }
    })
    res.json(result)
  })
  app.put(`/user/:id`, async (req, res) => {
    const {id} = req.body
    const result = await prisma.user.update({
        where: {
            id: parseInt(req.params.id)
        },
        data: {id}
    })
    res.json(result)
  })



app.listen(3000, () =>
  console.log(`
🚀 Server ready at: http://localhost:3000
⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`),
)