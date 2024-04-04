import { prisma } from "../src/lib/prisma";

async function seed() {
    await prisma.event.create({
      data: {
         id: 'e841e4c6-134f-4dbf-b25f-780ab7db6a68',
         title: 'Random Event',
         details: 'Details here',
         slug: 'SlugHere',
         maximunAttendees: 230,
      },
    })
}
    
// Executta assim que os comandos prisma da função acima finalizarem
seed().then(() => {
    console.log('Database seeded')
    prisma.$disconnect()
})