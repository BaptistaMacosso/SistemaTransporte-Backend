// controllers/prestadorController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
    // Criar Prestador
    async createPrestador(req, res) {
      try {
        const { prestadorNome, especialidade, contato, endereco } = req.body;
       
        //Verificação
        if (!prestadorNome || !especialidade || !contato || !endereco) {
          return res.status(409).json({ message: "Todos os campos são de preenchimento obrigatórios." });
        };

        const prestador = await prisma.prestador.create({
          data: {
            prestadorNome,
            especialidade,
            contato,
            endereco,
          },
        });
        return res.status(201).json({message: "Prestador criado com sucesso.", prestador});
      } catch (error) {
        return res.status(500).json({ message: "Erro ao criar o registo, por favor verifique a console. Detalhes: ",error });
      }
    },
  
    // Listar Prestadores
    async getAllPrestadores(req, res) {
      try {
        const listaPrestadores = await prisma.Prestador.findMany({orderBy: { prestadorId: 'asc', },
          select: {
            prestadorId: true,
            prestadorNome: true,
            especialidade: true,
            contato: true,
            endereco: true,
          },
        });
        res.status(200).json({prestadores: listaPrestadores});
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao listar todos os registos, por favor verifique a console.", error });
      }
    },
  
    // Obter Prestador por ID
    async getPrestadorById(req, res) {
      try {
        const { id } = req.params;
        const prestador = await prisma.prestador.findUnique({where: { prestadorId: parseInt(id) }});
        if (!prestador){ 
          return res.status(404).json({ message: "Prestador de serviço não encontrado." });
        }
        res.status(200).json({prestador: prestador});
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao listar registo pelo ID, por favor verifique a console.",error });
      }
    },
  
    // Atualizar Prestador
    async updatePrestador(req, res) {
      try {
        const { id } = req.params;
        const { prestadorNome, especialidade, contato, endereco } = req.body;

        //Verificação
        if (!prestadorNome || !especialidade || !contato || !endereco) {
          return res.status(409).json({ message: "Todos os campos são de preenchimento obrigatórios." });
        };

        //Verificar se existe
        const prestadorExiste = await prisma.prestador.findUnique({ where: { prestadorId: parseInt(id) } });
        if(!prestadorExiste) {
          return res.status(404).json({message: "Prestador de serviço não encontrado."});
        };

        // Atualizar prestador
        const prestador = await prisma.prestador.update({
          where: { prestadorId: parseInt(id) },
          data: {
            prestadorNome,
            especialidade,
            contato,
            endereco,
          },
        });
        return res.status(201).json({message: "Prestador de serviço actualizado com sucesso.", prestador});
      } catch (error) {
        return res.status(500).json({ message: "Erro ao actualizar o registo, por favor verifique a console.",error });
      }
    },
  
    // Deletar Prestador
    async deletePrestador(req, res) {
      try {
        const { id } = req.params;
        //Verificar se existe
        const prestadorExiste = await prisma.prestador.findUnique({ where: { prestadorId: parseInt(id) } });
        if(!prestadorExiste) {
          return res.status(404).json({message: "Prestador de serviço não encontrado."});
        };

        // Deletar prestador
        const prestadorDeleted = await prisma.prestador.delete({ where: { prestadorId: parseInt(id) } });
        return res.status(200).json({ message: "Prestador de serviço deletado com sucesso.",prestadorDeleted });
      } catch (error) {
        return res.status(500).json({ message: "Erro ao deletar o registo, por favor verifique a console.",error });
      }
    },
  };
  