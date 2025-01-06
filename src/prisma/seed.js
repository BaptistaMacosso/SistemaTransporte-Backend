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

  // Seed para GrupoUser
  await prisma.grupoUser.createMany({
    data: [
      {
        grupoName: 'Administradores',
        descricao: 'Grupo com acesso total ao sistema',
      },
      {
        grupoName: 'Operadores',
        descricao: 'Grupo com acesso limitado às operações diárias',
      },
      {
        grupoName: 'Supervisores',
        descricao: 'Grupo responsável pela supervisão e aprovações',
      },
      {
        grupoName: 'Motoristas',
        descricao: 'Grupo para todos os motoristas da empresa',
      },
    ],
    skipDuplicates: true,
  });

  // Seed para Manutencao
  await prisma.manutencao.createMany({
    data: [
      {
        viaturaId: 1,
        tipoManutencaoId: 1,
        descricao: 'Troca de óleo e revisão geral',
        dataManutencao: new Date('2025-01-15'),
        quilometragem: 75000,
        responsavel: 'José Manuel',
        statusManutencaoId: 2,
      },
      {
        viaturaId: 2,
        tipoManutencaoId: 2,
        descricao: 'Substituição de pneus e alinhamento',
        dataManutencao: new Date('2024-12-10'),
        quilometragem: 60000,
        responsavel: 'Ana Cardoso',
        statusManutencaoId: 1,
      },
    ],
    skipDuplicates: true,
  });

  // Seed para Checklist
  await prisma.checklist.createMany({
    data: [
      {
        viaturaId: 1,
        tipoManutencaoId: 1,
        quilometragem: 75000,
        itemsVerificados: 'Pneus, Óleo, Freios',
        observacao: 'Todos os itens em boas condições',
        dataCheckList: new Date('2025-01-01'),
        tecnicoResponsavel: 'Carlos Alberto',
      },
      {
        viaturaId: 2,
        tipoManutencaoId: 2,
        quilometragem: 60000,
        itemsVerificados: 'Luzes, Pneus, Suspensão',
        observacao: 'Substituir lâmpada traseira direita',
        dataCheckList: new Date('2025-01-05'),
        tecnicoResponsavel: 'Marta Silva',
      },
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
        numeroBI: '123456789LA045', // Número de BI no formato angolano
        motoristaEmail: 'joao.silva@email.com',
        motoristaTelefone: '987654321',
        CartaDeConducaoNr: 'LA-ABC-12345', // Número da Carta de Condução no formato angolano
        DataValidade: new Date('2025-12-31'),
      },
      {
        motoristaNome: 'Maria Oliveira',
        numeroBI: '987654321LU678', // Número de BI no formato angolano
        motoristaEmail: 'maria.oliveira@email.com',
        motoristaTelefone: '123456789',
        CartaDeConducaoNr: 'LU-XYZ-98765', // Número da Carta de Condução no formato angolano
        DataValidade: new Date('2026-06-30'),
      },
    ],
    skipDuplicates: true,
  });

  // Seed TipoManutencao
  await prisma.tipoManutencao.createMany({
    data: [
      { tipoManutencao: 'Manutenção Preventiva' },
      { tipoManutencao: 'Mecânica Geral' },
      { tipoManutencao: 'Funilaria e Pintura' },
      { tipoManutencao: 'Elétrica e Eletrônica' },
      { tipoManutencao: 'Ar-Condicionado' },
      { tipoManutencao: 'Pneus' },
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
        viaturaMatricula: 'LD-12-34-AA', // Matricula no formato angolano
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
        viaturaMatricula: 'LU-23-45-BB', // Matricula no formato angolano
        viaturaAnoFabrica: '2019',
        viaturaCombustivel: 'Gasolina',
        viaturaCor: 'Preto',
        quilometragem: 30000.0,
      },
      {
        viaturaTipoId: 1,
        viaturaCategoriaId: 2,
        viaturaMarca: 'Nissan',
        viaturaModelo: 'Navara',
        viaturaMatricula: 'BG-34-56-CC', // Matricula no formato angolano
        viaturaAnoFabrica: '2021',
        viaturaCombustivel: 'Diesel',
        viaturaCor: 'Azul',
        quilometragem: 10000.0,
      },
      {
        viaturaTipoId: 3,
        viaturaCategoriaId: 1,
        viaturaMarca: 'Hyundai',
        viaturaModelo: 'Tucson',
        viaturaMatricula: 'CB-45-67-DD', // Matricula no formato angolano
        viaturaAnoFabrica: '2018',
        viaturaCombustivel: 'Gasolina',
        viaturaCor: 'Branco',
        quilometragem: 60000.0,
      },
      {
        viaturaTipoId: 2,
        viaturaCategoriaId: 3,
        viaturaMarca: 'Mercedes-Benz',
        viaturaModelo: 'Sprinter',
        viaturaMatricula: 'SX-56-78-EE', // Matricula no formato angolano
        viaturaAnoFabrica: '2022',
        viaturaCombustivel: 'Diesel',
        viaturaCor: 'Cinza',
        quilometragem: 20000.0,
      },
    ],
    skipDuplicates: true,
  });

  // Seed TipoServico
  await prisma.tipoServico.createMany({
    data: [
      { tipoManutencao: 'Manutenção Preventiva' },
      { tipoManutencao: 'Mecânica Geral' },
      { tipoManutencao: 'Funilaria e Pintura' },
      { tipoManutencao: 'Elétrica e Eletrônica' },
      { tipoManutencao: 'Ar-Condicionado' },
      { tipoManutencao: 'Pneus' },
    ],
    skipDuplicates: true,
  });

  // Seed Status
  await prisma.status.createMany({
    data: [
      { descricao: 'Em análise' },
      { descricao: 'Aguardando Aprovação' },
      { descricao: 'Aprovado' },
    ],
    skipDuplicates: true,
  });

  // Seed Prestador
  await prisma.prestador.createMany({
    data: [
      {
        prestadorNome: 'Oficina Central',
        especialidade: 'Manutenção de veículos',
        contato: '+244 923 555 123', // Telefone no formato angolano
        endereco: 'Rua A, 123, Luanda', // Endereço completo com cidade
        oficinaPropria: true, // Indica que é uma oficina própria
      },
      {
        prestadorNome: 'Auto Elétrica São José',
        especialidade: 'Serviços elétricos',
        contato: '+244 923 555 567', // Telefone no formato angolano
        endereco: 'Rua B, 456, Benguela', // Endereço completo com cidade
        oficinaPropria: false, // Não é uma oficina própria
      },
    ],
    skipDuplicates: true,
  });
}

// Seed Permissão
await prisma.permissao.createMany({
  data: [
    { permissaonome: 'Motoristas - Visualizar', descricao: 'Permite visualizar motoristas', permitido: true },
      { permissaonome: 'Motoristas - Criar', descricao: 'Permite criar motoristas', permitido: true },
      { permissaonome: 'Motoristas - Editar', descricao: 'Permite editar motoristas', permitido: true },
      { permissaonome: 'Motoristas - Excluir', descricao: 'Permite excluir motoristas', permitido: true },

      { permissaonome: 'Checklist - Visualizar', descricao: 'Permite visualizar checklists', permitido: true },
      { permissaonome: 'Checklist - Criar', descricao: 'Permite criar checklists', permitido: true },
      { permissaonome: 'Checklist - Editar', descricao: 'Permite editar checklists', permitido: true },
      { permissaonome: 'Checklist - Excluir', descricao: 'Permite excluir checklists', permitido: true },

      { permissaonome: 'Manutenção - Visualizar', descricao: 'Permite visualizar manutenções', permitido: true },
      { permissaonome: 'Manutenção - Criar', descricao: 'Permite criar manutenções', permitido: true },
      { permissaonome: 'Manutenção - Editar', descricao: 'Permite editar manutenções', permitido: true },
      { permissaonome: 'Manutenção - Excluir', descricao: 'Permite excluir manutenções', permitido: true },

      { permissaonome: 'Licença de Publicidade - Visualizar', descricao: 'Permite visualizar licenças de publicidade', permitido: true },
      { permissaonome: 'Licença de Publicidade - Criar', descricao: 'Permite criar licenças de publicidade', permitido: true },
      { permissaonome: 'Licença de Publicidade - Editar', descricao: 'Permite editar licenças de publicidade', permitido: true },
      { permissaonome: 'Licença de Publicidade - Excluir', descricao: 'Permite excluir licenças de publicidade', permitido: true },

      { permissaonome: 'Licença de Transporte - Visualizar', descricao: 'Permite visualizar licenças de transporte', permitido: true },
      { permissaonome: 'Licença de Transporte - Criar', descricao: 'Permite criar licenças de transporte', permitido: true },
      { permissaonome: 'Licença de Transporte - Editar', descricao: 'Permite editar licenças de transporte', permitido: true },
      { permissaonome: 'Licença de Transporte - Excluir', descricao: 'Permite excluir licenças de transporte', permitido: true },

      { permissaonome: 'Prestadores - Visualizar', descricao: 'Permite visualizar prestadores', permitido: true },
      { permissaonome: 'Prestadores - Criar', descricao: 'Permite criar prestadores', permitido: true },
      { permissaonome: 'Prestadores - Editar', descricao: 'Permite editar prestadores', permitido: true },
      { permissaonome: 'Prestadores - Excluir', descricao: 'Permite excluir prestadores', permitido: true },

      { permissaonome: 'Assistência Técnica - Visualizar', descricao: 'Permite visualizar assistência técnica', permitido: true },
      { permissaonome: 'Assistência Técnica - Criar', descricao: 'Permite criar assistência técnica', permitido: true },
      { permissaonome: 'Assistência Técnica - Editar', descricao: 'Permite editar assistência técnica', permitido: true },
      { permissaonome: 'Assistência Técnica - Excluir', descricao: 'Permite excluir assistência técnica', permitido: true },

      { permissaonome: 'Viaturas - Visualizar', descricao: 'Permite visualizar viaturas', permitido: true },
      { permissaonome: 'Viaturas - Criar', descricao: 'Permite criar viaturas', permitido: true },
      { permissaonome: 'Viaturas - Editar', descricao: 'Permite editar viaturas', permitido: true },
      { permissaonome: 'Viaturas - Excluir', descricao: 'Permite excluir viaturas', permitido: true },

      { permissaonome: 'Usuários - Visualizar', descricao: 'Permite visualizar usuários', permitido: true },
      { permissaonome: 'Usuários - Criar', descricao: 'Permite criar usuários', permitido: true },
      { permissaonome: 'Usuários - Editar', descricao: 'Permite editar usuários', permitido: true },
      { permissaonome: 'Usuários - Excluir', descricao: 'Permite excluir usuários', permitido: true },

      { permissaonome: 'Configurações - Visualizar', descricao: 'Permite visualizar configurações', permitido: true },
      { permissaonome: 'Configurações - Editar', descricao: 'Permite editar configurações', permitido: true },
  ],
  skipDuplicates: true,
});

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
