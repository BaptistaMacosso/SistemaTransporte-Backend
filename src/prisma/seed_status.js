// seed.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Tipos de Manutenção
  const tipoManutencao = [
    { tipo: "DIARIA" },
    { tipo: "SEMANAL" },
    { tipo: "MENSAL" },
    { tipo: "PERIODICA" },
    { tipo: "ANUAL" },
  ];

  // Status de Manutenção
  const statusManutencao = [
    { status: "PENDENTE" },
    { status: "EM_ANDAMENTO" },
    { status: "CONCLUIDA" },
    { status: "CANCELADA" },
  ];

  // Categoria da Viatura
  const categoriaViatura = [
    { categoria: "SUV" },
    { categoria: "SEDAN" },
    { categoria: "HATCH" },
    { categoria: "PICKUP" },
    { categoria: "CAMINHAO" },
  ];

  // Tipo de Viatura
  const tipoViatura = [
    { tipo: "PASSEIO" },
    { tipo: "COMERCIAL" },
    { tipo: "UTILITARIO" },
  ];

  // Tipo de Serviço
  const tipoServico = [
    { servico: "REPARACAO" },
    { servico: "MANUTENCAO" },
    { servico: "REVISAO" },
    { servico: "BATE_CHAPA" },
    { servico: "PINTURA" },
    { servico: "LAVAGEM" },
  ];

  // Status de Serviço
  const statusServico = [
    { status: "PENDENTE" },
    { status: "EM_ANDAMENTO" },
    { status: "CONCLUIDO" },
    { status: "CANCELADO" },
  ];

  // Inserir dados
  await prisma.$transaction([
    prisma.tipoManutencao.createMany({ data: tipoManutencao }),
    prisma.statusManutencao.createMany({ data: statusManutencao }),
    prisma.categoriaViatura.createMany({ data: categoriaViatura }),
    prisma.tipoViatura.createMany({ data: tipoViatura }),
    prisma.tipoServico.createMany({ data: tipoServico }),
    prisma.status.createMany({ data: statusServico }),
  ]);

  console.log('Seed concluído com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
