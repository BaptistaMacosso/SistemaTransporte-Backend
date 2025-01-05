// controllers/pedidoController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  // Criar Pedido
  async createPedido(req, res) {
    try {
      const { viaturaId, descricao, tipoServicoId, statusId, prestadorId } = req.body;
      //Verificação
      if (!viaturaId || !descricao || !tipoServicoId || !statusId || !prestadorId) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios." });
      };

      //Criar Pedido
      const pedido = await prisma.pedido.create({
        data: {
          viaturaId: parseInt(viaturaId),
          descricao: descricao,
          tipoServicoId: parseInt(tipoServicoId),
          statusId: parseInt(statusId),
          prestadorId: parseInt(prestadorId),
        },
      });
      return res.status(201).json({message: "Pedido de serviço criado com sucesso.", pedido});
    } catch (error) {
      return res.status(500).json({ message: "Erro ao criar o pedido de assistência técnica."+ error });
    }
  },

  // Listar Pedidos
  async getAllPedidos(req, res) {
    try {
      const pedidos = await prisma.pedido.findMany({orderBy: { pedidoId: 'asc', },
        select: {
          pedidoId: true,
          viaturaId: true,
          descricao: true,
          dataSolicitacao: true,
          tipoServicoId: true,
          statusId: true,
          prestadorId: true,
          viatura: {
            select: {
              viaturaMarca: true,
              viaturaModelo: true,
              viaturaMatricula: true,
            },
            },
          prestador: {
            select: {
              prestadorNome: true,
            },
          },
          tipoServico: {
            select: {
              tipoServico: true,
            },
          },
          status: {
            select: {
              descricao: true,
            },
          },
        }
      });
      return res.status(200).json({pedidos: pedidos});
    } catch (error) {
      return res.status(500).json({ message: "Erro ao buscar os pedidos de assistência técnica. "+error });
    }
  },

  // Obter Pedido por ID
  async getPedidoById(req, res) {//Deve-se verificar depois.
    try {
      const { id } = req.params;
      const pedido = await prisma.pedido.findUnique({
        where: { pedidoId: parseInt(id) },
        select: {
          pedidoId: true,
          viaturaId: true,
          descricao: true,
          dataSolicitacao: true,
          tipoServicoId: true,
          statusId: true,
          prestadorId: true,
          viatura: {
            select: {
              viaturaMarca: true,
              viaturaModelo: true,
              viaturaMatricula: true,
            },
            },
          prestador: {
            select: {
              prestadorNome: true,
            },
          },
          tipoServico: {
            select: {
              tipoServico: true,
            },
          },
          status: {
            select: {
              descricao: true,
            },
          },
        }
      });
      if (!pedido) return res.status(404).json({ message: "Pedido de serviço não encontrado." });
      return res.status(200).json({pedido: pedido});
    } catch (error) {
      return res.status(500).json({ message: "Erro ao buscar pedido de serviço. "+error });
    }
  },

  // Atualizar Pedido
  async updatePedido(req, res) {
    try {
      const { id } = req.params;
      const { viaturaId, descricao, tipoServicoId, statusId, prestadorId } = req.body;

      //Verificar se existe
      const pedidoExiste = await prisma.pedido.findUnique({ where: { pedidoId: parseInt(id) } });
      if(!pedidoExiste) return res.status(404).json({message: "Pedido de assisência técnica não encontrado."});

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
      return res.status(200).json({message: "Pedido de assisência técnica atualizado com sucesso.", pedido});
    } catch (error) {
      return res.status(500).json({ message: "Erro ao atualizar pedido de assisência técnica."+error });
    }
  },

  // Deletar Pedido
  async deletePedido(req, res) {
    try {
      const { id } = req.params;
      //Verificar se existe
      const pedidoExiste = await prisma.pedido.findUnique({ where: { pedidoId: parseInt(id) } });
      if(!pedidoExiste) return res.status(404).json({message: "Pedido de assisência técnica não encontrado."});

      // Deletar pedido
      const pedidoDeleted = await prisma.pedido.delete({ where: { pedidoId: parseInt(id) } });
      return res.status(200).json({ message: "Pedido de assisência técnica deletado com sucesso."+ pedidoDeleted });
    } catch (error) {
      return res.status(500).json({ message: "Erro ao deletar pedido de assisência técnica."+error });
    }
  },
};