const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const privilageData = [
    {
        name: "admin"
    },
    {
        name: "standard"
    }
]

const userData = [
  {
    username: 'Alice',
    email: 'alice@prisma.io',
    password:"12345",
    // privilegeId:1,
    
  },
  {
    username: 'Nilu',
    email: 'nilu@prisma.io',
    password:"12345",
    //privilegeId:2,
  },
  {
    username: 'Mahmoud',
    email: 'mahmoud@prisma.io',
    password:"12345",
    //privilegeId:3
   
  },
]

async function main() {
  console.log(`Start seeding ...`)
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    })
    console.log(`Created user with id: ${user.id}`)
  }

//   for (const u of privilageData) {
//     const user = await prisma.privilage.create({
//       data: u,
//     })
//     // console.log(`Created user with id: ${user.id}`)
//   }  
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