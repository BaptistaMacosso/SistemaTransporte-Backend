const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const seed = async () => {
  try {
    console.log('Iniciando o seed de permissões...');

    // Permissões organizadas por categorias
    const permissoes = [
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
    ];

    // Inserir permissões no banco
    for (const permissao of permissoes) {
      await prisma.permissao.create({ data: permissao });
    }

    console.log('Seed de permissões concluído com sucesso!');
  } catch (error) {
    console.error('Erro ao executar o seed de permissões:', error);
  } finally {
    await prisma.$disconnect();
  }
};

// Executar o seed
seed();
