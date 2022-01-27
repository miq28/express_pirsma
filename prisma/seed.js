const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const userData = [
  {
    nama: 'Alice',
    email: 'alice@prisma.io',
    password:"12345"
    
  },
  {
    nama: 'Nilu',
    email: 'nilu@prisma.io',
    password:"12345"
    
  },
  {
    nama: 'Mahmoud',
    email: 'mahmoud@prisma.io',
    password:"12345"
    
   
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