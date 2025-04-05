import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Certifique-se que os tipos e categorias já existem no banco
  const tipo = await prisma.viaturaTipo.findFirst();
  const categoria = await prisma.viaturaCategoria.findFirst();

  if (!tipo || !categoria) {
    throw new Error("❌ Tipos ou Categorias de Viatura não encontrados. Crie-os antes do seed de viaturas.");
  }

  // Inserir viaturas
  await prisma.viatura.createMany({
    data: [
      {
        viaturaTipoId: 2,
        viaturaCategoriaId: 4,
        viaturaMarca: 'Toyota',
        viaturaModelo: 'Hilux',
        viaturaMatricula: 'LD-23-01-AA',
        viaturaAnoFabrica: '2021',
        viaturaCombustivel: 'Gasóleo',
        viaturaCor: 'Preto',
        quilometragem: new prisma.Prisma.Decimal(13250.75),
      },
      {
        viaturaTipoId: 3,
        viaturaCategoriaId: 4,
        viaturaMarca: 'Hyundai',
        viaturaModelo: 'Creta',
        viaturaMatricula: 'LD-45-99-BB',
        viaturaAnoFabrica: '2022',
        viaturaCombustivel: 'Gasolina',
        viaturaCor: 'Branco',
        quilometragem: new prisma.Prisma.Decimal(8540.20),
      },
      {
        viaturaTipoId: 1,
        viaturaCategoriaId: 1,
        viaturaMarca: 'Kia',
        viaturaModelo: 'Sportage',
        viaturaMatricula: 'LD-00-00-CC',
        viaturaAnoFabrica: '2023',
        viaturaCombustivel: 'Gasolina',
        viaturaCor: 'Cinza',
        quilometragem: new prisma.Prisma.Decimal(440.10),
      },
    ],
  });

  console.log('✅ Viaturas adicionadas com sucesso!');
}

main()
  .catch((e) => {
    console.error('Erro ao executar seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
