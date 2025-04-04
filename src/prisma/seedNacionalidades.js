import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Inserindo nacionalidades...');

  const nacionalidades = [
    { nacionalidadeId: 'Angolana' },
    { nacionalidadeId: 'Brasileira' },
    { nacionalidadeId: 'Portuguesa' }
  ];

  for (const nacionalidade of nacionalidades) {
    await prisma.nacionalidades.upsert({
      where: { nacionalidadeId: nacionalidade.nacionalidadeId },
      update: {},
      create: nacionalidade,
    });
  }

  console.log('Nacionalidades inseridas com sucesso!');
}

main()
  .catch((error) => {
    console.error('Erro ao inserir nacionalidades:', error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
