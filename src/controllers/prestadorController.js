// controllers/prestadorController.js

module.exports = {
    // Criar Prestador
    async createPrestador(req, res) {
      try {
        const { prestadorNome, especialidade, contato, endereco } = req.body;
        const prestador = await prisma.prestador.create({
          data: {
            prestadorNome,
            especialidade,
            contato,
            endereco,
          },
        });
        res.status(201).json({message: "Prestador criado com sucesso", prestador});
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao criar prestador" });
      }
    },
  
    // Listar Prestadores
    async getAllPrestadores(req, res) {
      try {
        const prestadores = await prisma.prestador.findMany({ include: { pedidos: true } });
        res.status(200).json({prestadores: prestadores});
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar prestadores de serviço" });
      }
    },
  
    // Obter Prestador por ID
    async getPrestadorById(req, res) {
      try {
        const { id } = req.params;
        const prestador = await prisma.prestador.findUnique({
          where: { prestadorId: parseInt(id) },
          include: { pedidos: true },
        });
        if (!prestador) return res.status(404).json({ error: "Prestador de serviço não encontrado" });
        res.status(200).json(prestador);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar prestador de serviço" });
      }
    },
  
    // Atualizar Prestador
    async updatePrestador(req, res) {
      try {
        const { id } = req.params;
        const { prestadorNome, especialidade, contato, endereco } = req.body;

        //Verificar se existe
        const prestadorExiste = await prisma.prestador.findUnique({ where: { prestadorId: parseInt(id) } });
        if(!prestadorExiste) return res.status(404).json({error: "Prestador de serviço não encontrado"});

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
        res.status(200).json({message: "Prestador de serviço atualizado com sucesso", prestador});
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao atualizar prestador de serviço" });
      }
    },
  
    // Deletar Prestador
    async deletePrestador(req, res) {
      try {
        const { id } = req.params;
        //Verificar se existe
        const prestadorExiste = await prisma.prestador.findUnique({ where: { prestadorId: parseInt(id) } });
        if(!prestadorExiste) return res.status(404).json({error: "Prestador de serviço não encontrado"});

        // Deletar prestador
        await prisma.prestador.delete({ where: { prestadorId: parseInt(id) } });
        res.status(200).json({ message: "Prestador de serviço deletado com sucesso" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao deletar prestador de serviço" });
      }
    },
  };
  