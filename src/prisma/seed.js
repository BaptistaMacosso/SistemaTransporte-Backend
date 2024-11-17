const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Seed TipoUser
  const tipoUsers = await prisma.tipoUser.createMany({
    data: [
      { descricaoTipo: 'Administrador', parametro_edit_config: true },
      { descricaoTipo: 'Motorista', parametro_edit_config: false },
    ],
    skipDuplicates: true,
  });

  console.log('Tipos de Usuário criados:', tipoUsers);

  // Seed User
  /*const userAdmin = await prisma.user.create({
    data: {
      userNome: 'administrador',
      userEmail: 'admin@admin.com',
      userPassword: 'admin123', // Idealmente, use hash
      tipoUsuarioId: 1, // ID do Administrador
    },
  });

  console.log('Usuário Admin criado:', userAdmin);*/

  // Seed Motorista
  const motorista = await prisma.motorista.create({
    data: {
      motoristaNome: 'João Silva',
      numeroBI: '123456789',
      motoristaEmail: 'joao.silva@example.com',
      motoristaTelefone: '923456789',
      CartaDeConducaoNr: 'AA123456',
      DataValidade: '2025-12-31',
    },
  });

  console.log('Motorista criado:', motorista);

  // Seed Viatura
  const viatura = await prisma.viatura.create({
    data: {
      viaturaMarca: 'Toyota',
      viaturaModelo: 'Corolla',
      viaturaMatricula: 'ABC-1234',
      viaturaAnoFabrica: '2020',
      viaturaCombustivel: 'Gasolina',
      viaturaCor: 'Preto',
      viaturaNumeroChassi: 'CHASSI123456',
      viaturaNumeroLugar: '5',
      viaturaNumeroMotor: 'MOTOR123456',
      quilometragem: '50000',
    },
  });

  console.log('Viatura criada:', viatura);

  // Seed Plano de Manutenção
  const planoManutencao = await prisma.planoManutencao.create({
    data: {
      viaturaId: viatura.viaturaId,
      dataManutencao: '2024-01-15',
      descricao: 'Troca de óleo e filtros',
      custoPrevisto: 150.00,
      status: false,
    },
  });

  console.log('Plano de Manutenção criado:', planoManutencao);

  // Seed Tipo de Manutenção
  const tipoManutencao = await prisma.tipoManutencao.create({
    data: {
      nome: 'Preventiva',
    },
  });

  console.log('Tipo de Manutenção criado:', tipoManutencao);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
