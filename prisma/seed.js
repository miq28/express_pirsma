const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const roleData = [
  {
      name: "admin",
  },
  {
      name: "moderator"
  },
  {
      name: "user"
  }
]


const userData = [
  {
    username: 'admin',
    name: 'admin',
    email: 'admin@prisma.io',
    password:"$2a$10$P7QBEdWK.qhZR2wYAaEpeOJ5n/djpjYoKEOmZs.Ww.Ovt1zZ/kn6i",
    roleId: 1
  },
  {
    username: 'moderator',
    name: 'moderator',
    email: 'moderator@prisma.io',
    password:"$2a$10$P7QBEdWK.qhZR2wYAaEpeOJ5n/djpjYoKEOmZs.Ww.Ovt1zZ/kn6i",
    roleId: 2
  },
  {
    username: 'nilu',
    name: 'nilu',
    email: 'nilu@prisma.io',
    password:"$2a$10$P7QBEdWK.qhZR2wYAaEpeOJ5n/djpjYoKEOmZs.Ww.Ovt1zZ/kn6i",
    roleId: 3
  },
  {
    username: 'mahmoud',
    name: 'mahmoud',
    email: 'mahmoud@prisma.io',
    password:"$2a$10$P7QBEdWK.qhZR2wYAaEpeOJ5n/djpjYoKEOmZs.Ww.Ovt1zZ/kn6i",
    roleId: 3
   
  },
]

async function main() {
  console.log(`Start seeding ...`)
  for (const u of roleData) {
    const role = await prisma.role.create({
      data: u,
    })
    console.log(`Created role with name: ${role.name}`)
  }

  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    })
    console.log(`Created user with id: ${user.id}`)
  }
 
  console.log(`Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })