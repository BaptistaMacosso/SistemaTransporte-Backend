// controllers/pedidoController.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  // Criar Pedido
  async createPedido(req, res) {
    try {
      const { viaturaId, descricao, tipoServicoId, statusId, prestadorId } = req.body;
      const pedido = await prisma.pedido.create({
        data: {
          viaturaId,
          descricao,
          tipoServicoId,
          statusId,
          prestadorId,
        },
      });
      res.status(201).json({message: "Pedido de serviço criado com sucesso", pedido});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao criar pedido de serviço" });
    }
  },

  // Listar Pedidos
  async getAllPedidos(req, res) {
    try {
      const pedidos = await prisma.pedido.findMany({
        include: {
          prestador: true,
          viatura: true,
          tipoServico: true,
          status: true,
        },
      });
      res.status(200).json(pedidos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao buscar pedidos" });
    }
  },

  // Obter Pedido por ID
  async getPedidoById(req, res) {
    try {
      const { id } = req.params;
      const pedido = await prisma.pedido.findUnique({
        where: { pedidoId: parseInt(id) },
        include: {
          prestador: true,
          viatura: true,
          tipoServico: true,
          status: true,
        },
      });
      if (!pedido) return res.status(404).json({ error: "Pedido de serviço não encontrado" });
      res.status(200).json(pedido);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao buscar pedido de serviço" });
    }
  },

  // Atualizar Pedido
  async updatePedido(req, res) {
    try {
      const { id } = req.params;
      const { viaturaId, descricao, tipoServicoId, statusId, prestadorId } = req.body;

      //Verificar se existe
      const pedidoExiste = await prisma.pedido.findUnique({ where: { pedidoId: parseInt(id) } });
      if(!pedidoExiste) return res.status(404).json({error: "Pedido de serviço não encontrado"});

      // Atualizar pedido
      const pedido = await prisma.pedido.update({
        where: { pedidoId: parseInt(id) },
        data: {
          viaturaId,
          descricao,
          tipoServicoId,
          statusId,
          prestadorId,
        },
      });
      res.status(200).json({message: "Pedido de serviço atualizado com sucesso", pedido});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao atualizar pedido de serviço" });
    }
  },

  // Deletar Pedido
  async deletePedido(req, res) {
    try {
      const { id } = req.params;
      //Verificar se existe
      const pedidoExiste = await prisma.pedido.findUnique({ where: { pedidoId: parseInt(id) } });
      if(!pedidoExiste) return res.status(404).json({error: "Pedido de serviço não encontrado"});

      // Deletar pedido
      await prisma.pedido.delete({ where: { pedidoId: parseInt(id) } });
      res.status(200).json({ message: "Pedido de serviço deletado com sucesso" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao deletar pedido de serviço" });
    }
  },
};