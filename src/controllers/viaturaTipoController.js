// controllers/viaturaTipoController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  //Viatura Tipo Controllers

  async createViaturaTipo(req, res) {
    try {
      const { viaturaTipo } = req.body;
      //Verificação
      if (!viaturaTipo) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
      };

      //Criar Tipo de Viatura
      const tipo = await prisma.viaturaTipo.create({
        data: { viaturaTipo },
      });
      res.status(201).json({message: "Tipo de viatura criado com sucesso.", tipo});
    } catch (error) {
      res.status(500).json({ error: "Erro ao criar tipo de viatura. Detalhes: "+error });
    }
  },

  async getAllViaturaTipo(req, res) {
    try {
      const tipos = await prisma.viaturaTipo.findMany({
        select: {
          id: true,
          viaturaTipo: true,
        },
      });
      console.log(tipos);
      res.status(200).json({viaturatipo: tipos});
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar tipo de viatura. Detalhes: "+error });
    }
  },

  async deleteViaturaTipo(req, res) {
    try {
      const { id } = req.params;
      //Verificação
      const tipoExiste = await prisma.viaturaTipo.findUnique({ where: { id: parseInt(id)}});
      if (!tipoExiste) {
        return res.status(404).json({ message: 'Tipo de viatura não encontrado.' });
      };
      //Deletar Tipo de Viatura
      const tipoDelete = await prisma.viaturaTipo.delete({ where: { id: parseInt(id)}});

      res.status(200).json({ message: "Tipo de viatura deletado com sucesso. "+tipoDelete });
    } catch (error) {
      res.status(500).json({ error: "Erro ao deletar tipo de viatura. Detalhes: "+error });
    }
  },
};