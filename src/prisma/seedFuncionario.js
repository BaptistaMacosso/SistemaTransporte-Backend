import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient();

async function main() {
  console.log('Inserindo funcionários...');

  await prisma.funcionario.createMany({
    data: [
      {
        funcionarioNome: 'Carlos Silva',
        numeroBI: '123456789',
        nacionalidade: 'ANGOLANA',
        genero: 'Masculino',
        provincia: 'Luanda',
        funcionarioEmail: 'carlos.silva@example.com',
        funcionarioTelefone: '+244923456789',
        CartaDeConducaoNr: 'A1234567',
        DataEmissao: '2023-05-10',
        DataValidade: '2028-05-10',
        categoriaId: 'MOTORISTA 1ª CLASSE',
        funcaoTipoId: 'MOTORISTA',
        copiaBI: fs.readFileSync('src/prisma/files/carlos_bi.pdf'),
        copiaCartaCoducao: fs.readFileSync('src/prisma/files/carlos_carta.pdf'),
        copiaLicencaConducao: null,
        fotografia: fs.readFileSync('src/prisma/files/carlos_foto.jpg'),
        estado: 'Ativo',
      },
      {
        funcionarioNome: 'Maria Santos',
        numeroBI: '987654321',
        nacionalidade: 'MOÇAMBICANA',
        genero: 'Feminino',
        provincia: 'Maputo',
        funcionarioEmail: 'maria.santos@example.com',
        funcionarioTelefone: '+258876543210',
        CartaDeConducaoNr: 'B7654321',
        DataEmissao: '2022-07-15',
        DataValidade: '2027-07-15',
        categoriaId: 'ADMINISTRADOR',
        funcaoTipoId: 'GESTOR',
        copiaBI: fs.readFileSync('src/prisma/files/maria_bi.pdf'),
        copiaCartaCoducao: null,
        copiaLicencaConducao: null,
        fotografia: fs.readFileSync('src/prisma/files/maria_foto.jpg'),
        estado: 'Ativo',
      },
      {
        funcionarioNome: 'José Ferreira',
        numeroBI: '1122334455',
        nacionalidade: 'BRASILEIRA',
        genero: 'Masculino',
        provincia: 'São Paulo',
        funcionarioEmail: 'jose.ferreira@example.com',
        funcionarioTelefone: '+5511987654321',
        CartaDeConducaoNr: 'C9876543',
        DataEmissao: '2021-09-20',
        DataValidade: '2026-09-20',
        categoriaId: 'SUPERVISOR',
        funcaoTipoId: 'SUPERVISOR',
        copiaBI: fs.readFileSync('src/prisma/files/jose_bi.pdf'),
        copiaCartaCoducao: fs.readFileSync('src/prisma/files/jose_carta.pdf'),
        copiaLicencaConducao: fs.readFileSync('src/prisma/files/jose_licenca.pdf'),
        fotografia: fs.readFileSync('src/prisma/files/carlos_foto.jpg'),
        estado: 'Ativo',
      },
    ],
  });

  console.log('Funcionários inseridos com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
