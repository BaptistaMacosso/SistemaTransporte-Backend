// controllers/manutencaoController.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  /**
   * Handler para criar uma nova manutenção.
   * @param {Object} req - Objeto de requisição do Express.
   * @param {Object} res - Objeto de resposta do Express.
   */
  async criarManutencao(req, res) {
    try {
      const { viaturaId, tipoManutencaoId, descricao, Quilometragem, responsavel, statusManutencaoId } = req.body;

      if(!viaturaId || !tipoManutencaoId || !descricao || !Quilometragem || !responsavel 
         || !statusManutencaoId){ return res.status(400).json({ message: "Todos os campos são obrigatórios." });}

      if (isNaN(Number(quilometragem))) { return res.status(500).json({message:"Quilometragem deve ser um número."}); }

      const novaManutencao = await prisma.manutencao.create({data:{
        viaturaId: viaturaId,
        tipoManutencaoId: tipoManutencaoId,
        descricao: descricao,
        quilometragem: quilometragem,
        responsavel: responsavel,
        statusManutencaoId: statusManutencaoId
      }});

      return res.status(201).json({message: "Manutenção criada com sucesso.", novaManutencao});
    } catch (error) {
      return res.status(500).json({ message: "Erro ao criar manutenção. Detalhes:"+ error });
    }
  },

  /**
   * Handler para editar uma manutenção existente.
   * @param {Object} req - Objeto de requisição do Express.
   * @param {Object} res - Objeto de resposta do Express.
   */
  async editarManutencao(req, res) {
    try {
      const { id } = req.params;
      const {viaturaId, tipoManutencaoId, descricao, Quilometragem, responsavel, statusManutencaoId} = req.body;
      
      //Verificação
      const Existe = await prisma.manutencao.findUnique({ where: { id: parseInt(id) }});
      if(!Existe){ return res.status(404).json({message: "Manutenção não encontrada."}); }

      const manutencaoAtualizada = await prisma.manutencao.update({
        where: { id: parseInt(id) },
        data: {
            viaturaId: viaturaId,
            tipoManutencao: tipoManutencaoId,
            descricao: descricao,
            quilometragem: Quilometragem,
            responsavel: responsavel,
            statusManutencaoId: statusManutencaoId
        }
      });
      return res.status(200).json({message: "Manutenção atualizada com sucesso.", manutencaoAtualizada});
    } catch (error) {
      return res.status(500).json({ message: "Erro ao editar manutenção. Detalhes:"+ error });
    }
  },

  /**
   * Handler para listar uma manutenção pelo ID.
   * @param {Object} req - Objeto de requisição do Express.
   * @param {Object} res - Objeto de resposta do Express.
   */
  async listarManutencaoPorId(req, res) {
    try {
      const { id } = req.params;
      const manutencao = await prisma.manutencao.findUnique({ where: { id: parseInt(id) } });
      if (!manutencao) {
        return res.status(404).json({ message: 'Manutenção não encontrada.' });
      }
      return res.status(200).json({manutencao: manutencao});
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar manutenção. Detalhes: '+error });
    }
  },

  /**
   * Handler para listar manutenções por matrícula da viatura.
   * @param {Object} req - Objeto de requisição do Express.
   * @param {Object} res - Objeto de resposta do Express.
   */
  async listarManutencaoPorMatricula(req, res) {
    try {
      const { viaturaMatricula } = req.params;
      const manutencao = await prisma.manutencao.findUnique({ where: { viaturaMatricula: parseInt(viaturaMatricula) }});
      if(!manutencao){ return res.status(404).json({message: "Manutenção não encontrada."});}

      return res.status(200).json({manutencao: manutencao});
    } catch (error) {
      return res.status(500).json({ message: "Erro ao buscar manutenção. Detalhes: "+error});
    }
  },

  /**
   * Handler para listar todas as manutenções de viatura.
   * @param {Object} req - Objeto de requisição do Express.
   * @param {Object} res - Objeto de resposta do Express.
   */
  async listarManutencao(req, res) {
    try {
      const manutencao = await prisma.manutencao.findMany();
      return res.status(200).json({manutencao: manutencao});
    } catch (error) {
      return res.status(500).json({ message: "Erro ao buscar manutenção. Detalhes: "+error});
    }
  },

  /**
   * Handler para deletar uma manutenção pelo ID.
   * @param {Object} req - Objeto de requisição do Express.
   * @param {Object} res - Objeto de resposta do Express.
   */
  async deletarManutencao(req, res) {
    try {
      const { id } = req.params;

      const manutencaoExiste = await prisma.manutencao.findUnique({ where: { id: parseInt(id) }});
      if(!manutencaoExiste){ return res.status(404).json({message: "Manutenção não encontrada."});}

      const manutencaoDeletada = await prisma.manutencao.delete({where: { id: parseInt(id) }});
      return resstatus(200).json({message: "Manutenção deletada com sucesso.", manutencaoDeletada});
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao deletar manutenção. Detalhes: '+error });
    }
  },

  /**
   * Handler para alterar o status de uma manutenção.
   * @param {Object} req - Objeto de requisição do Express.
   * @param {Object} res - Objeto de resposta do Express.
   */
  async alterarManutencaoStatus(req, res) {
    try {
      const { id } = req.params;
      const { novoStatusId } = req.body;
      const manutencaoAtualizada = await prisma.manutencao.update({
        where: { id: parseInt(id) },
        data: { statusManutencaoId: novoStatusId }
      });
      return res.status(200).json({message: "Status da manutenção alterado com sucesso.",manutencaoAtualizada});
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao alterar status da manutenção. Detalhes: '+error });
    }
  },
};