import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding...');

  await prisma.user.upsert({
    where: { email: 'mentor@example.com' },
    update: {},
    create: {
      name: 'Mentor',
      email: 'mentor@example.com',
    },
  });

  console.log('✅ Seed concluído!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
