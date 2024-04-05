import { prisma } from '../src/lib/prisma'

async function seed() {
  await prisma.event.create({
    data: {
      id: "0f4321c8-aad7-4bb1-bf0b-9d680184efaa",
      title: 'Test Event',
      details: 'This is a test event',
      slug: 'teste-event',
      maximumAttendees: 10
    }
  })
}

seed().then(() => {
  console.log('Database seeded.')
  prisma.$disconnect()
})