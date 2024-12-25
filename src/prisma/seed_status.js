// seed.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Tipos de Manutenção
  await prisma.tipomanutencao.createMany({
    data: [
      { tipo: "DIARIA" },
      { tipo: "SEMANAL" },
      { tipo: "MENSAL" },
      { tipo: "PERIODICA" },
      { tipo: "ANUAL" },
    ],
    skipDuplicates: true,
  });

  console.log('Tipos de Manutenção criados:');

  // Status de Manutenção
  await prisma.statusManutencao.createMany({
    data: [
      { status: "PENDENTE" },
      { status: "EM_ANDAMENTO" },
      { status: "CONCLUIDA" },
      { status: "CANCELADA" },
    ],
    skipDuplicates: true,
  });

  console.log('Status de Manutenção criados:');


  // Categoria da Viatura
  await prisma.categoriaViatura.createMany({
    data: [
      { categoria: "SUV" },
      { categoria: "SEDAN" },
      { categoria: "HATCH" },
      { categoria: "PICKUP" },
      { categoria: "CAMINHAO" },
    ],
    skipDuplicates: true,
  });

  console.log('Categoria da Viatura criada:');


  // Tipo de Viatura
  await prisma.tipoViatura.createMany({
    data: [
      { tipo: "CARRO" },
      { tipo: "PASSEIO" },
      { tipo: "COMERCIAL" },
      { tipo: "UTILITARIO" },
    ],
    skipDuplicates: true,
  });

  console.log('Tipo de Viatura criada:');


  // Tipo de Serviço
  await prisma.tipoServico.createMany({
    data: [
      { servico: "REPARACÃO" },
      { servico: "MANUTENCÃO" },
      { servico: "REVISÃO" },
      { servico: "BATE_CHAPA" },
      { servico: "PINTURA" },
      { servico: "LAVAGEM" },
    ],
    skipDuplicates: true,
  });

  console.log('Tipo de Serviço criada:');



  // Status de Serviço
  await prisma.status.createMany({
    data:[
      { status: "PENDENTE" },
      { status: "EM_ANDAMENTO" },
      { status: "CONCLUIDO" },
      { status: "CANCELADO" },
    ],
    skipDuplicates: true,
  });

  console.log('Status de Serviço criado:');


  // Inserir dados
  /*
  await prisma.$transaction([
    prisma.tipoManutencao.createMany({ data: tipoManutencao }),
    prisma.statusManutencao.createMany({ data: statusManutencao }),
    prisma.categoriaViatura.createMany({ data: categoriaViatura }),
    prisma.tipoViatura.createMany({ data: tipoViatura }),
    prisma.tipoServico.createMany({ data: tipoServico }),
    prisma.status.createMany({ data: statusServico }),
  ]);

  console.log('Seed concluído com sucesso!');
*/
}
main()
  .then(async () => {
    await prisma.$disconnect();
  }).catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});
