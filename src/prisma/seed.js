const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Seed TipoUser
  await prisma.tipoUser.createMany({
    data: [
      { descricaoTipo: 'Administrador', parametro_edit_config: true },
      { descricaoTipo: 'Operador', parametro_edit_config: false },
    ],
    skipDuplicates: true,
  });

  // Seed ViaturaTipo
  await prisma.viaturaTipo.createMany({
    data: [
      { viaturaTipo: 'Caminhão' },
      { viaturaTipo: 'Carro' },
      { viaturaTipo: 'Moto' },
    ],
    skipDuplicates: true,
  });

  // Seed ViaturaCategoria
  await prisma.viaturaCategoria.createMany({
    data: [
      { viaturaCategoria: 'Leve' },
      { viaturaCategoria: 'Pesada' },
    ],
    skipDuplicates: true,
  });

  // Seed Motorista
  await prisma.motorista.createMany({
    data: [
      {
        motoristaNome: 'João Silva',
        numeroBI: '123456789',
        motoristaEmail: 'joao.silva@email.com',
        motoristaTelefone: '987654321',
        CartaDeConducaoNr: 'ABC12345',
        DataValidade: '2025-12-31',
      },
      {
        motoristaNome: 'Maria Oliveira',
        numeroBI: '987654321',
        motoristaEmail: 'maria.oliveira@email.com',
        motoristaTelefone: '123456789',
        CartaDeConducaoNr: 'XYZ98765',
        DataValidade: '2026-06-30',
      },
    ],
    skipDuplicates: true,
  });

  // Seed TipoManutencao
  await prisma.tipoManutencao.createMany({
    data: [
      { tipoManutencao: 'Preventiva' },
      { tipoManutencao: 'Corretiva' },
      { tipoManutencao: 'Emergencial' },
    ],
    skipDuplicates: true,
  });

  // Seed StatusManutencao
  await prisma.statusManutencao.createMany({
    data: [
      { statusManutencao: 'Pendente' },
      { statusManutencao: 'Concluído' },
      { statusManutencao: 'Cancelado' },
    ],
    skipDuplicates: true,
  });

  // Seed Viaturas
  await prisma.viatura.createMany({
    data: [
      {
        viaturaTipoId: 1,
        viaturaCategoriaId: 1,
        viaturaMarca: 'Toyota',
        viaturaModelo: 'Hilux',
        viaturaMatricula: 'ABC-1234',
        viaturaAnoFabrica: '2020',
        viaturaCombustivel: 'Diesel',
        viaturaCor: 'Prata',
        quilometragem: 50000.0,
      },
      {
        viaturaTipoId: 2,
        viaturaCategoriaId: 1,
        viaturaMarca: 'Honda',
        viaturaModelo: 'Civic',
        viaturaMatricula: 'XYZ-5678',
        viaturaAnoFabrica: '2019',
        viaturaCombustivel: 'Gasolina',
        viaturaCor: 'Preto',
        quilometragem: 30000.0,
      },
    ],
    skipDuplicates: true,
  });

  // Seed TipoServico
  await prisma.tipoServico.createMany({
    data: [
      { tipoServico: 'Transporte' },
      { tipoServico: 'Entrega' },
    ],
    skipDuplicates: true,
  });

  // Seed Status
  await prisma.status.createMany({
    data: [
      { descricao: 'Aguardando' },
      { descricao: 'Em andamento' },
      { descricao: 'Finalizado' },
    ],
    skipDuplicates: true,
  });

  // Seed Prestador
  await prisma.prestador.createMany({
    data: [
      {
        prestadorNome: 'Oficina Central',
        especialidade: 'Manutenção de veículos',
        contato: '555-1234',
        endereco: 'Rua A, 123',
      },
      {
        prestadorNome: 'Auto Elétrica São José',
        especialidade: 'Serviços elétricos',
        contato: '555-5678',
        endereco: 'Rua B, 456',
      },
    ],
    skipDuplicates: true,
  });
}

main()
  .then(async () => {
    console.log('Seeding concluído!');
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('Erro no seeding:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
