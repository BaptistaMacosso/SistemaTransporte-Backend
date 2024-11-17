const { PrismaClient }  = require('@prisma/client');
const prisma = new PrismaClient();

//Criar Tipo de Manutenção
const createTipoManutencao = async(req, res) => {
  const { nome } = req.body;
  //Verificar campos vazios.
  if (!nome) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
  }
    
  const tipoManutencaoExists = await prisma.tipoManutencao.findFirst({ where: { nome } });
  if (tipoManutencaoExists) {
    return res.status(400).json({ message: 'Tipo de manutenção já existe' });
  }

  // Salvar os dados no banco de dados
  const tipoManutencao = await prisma.tipoManutencao.create({
        data: {
            nome: nome,
        },
   });

   return res.status(201).json({ message: 'Tipo de manutenção cadastrada com sucesso'});
}

//Listar Tipo de Manutenção
const listarTipoManutencao = async (req, res) => {
    try {
        const listaTipoManutencao = await prisma.tipoManutencao.findMany();
        res.status(200).json({ listaTipoManutencao });
    } catch (error) {
        return res.status(500).json({message: 'error ao listar tipo de manutenção '+error.message });
    }
}

//Deletar Tipo de Manutenção
const deleteTipoManutencao = async (req, res) => {
    const { id } = req.params;

    try {
        const tipoManutencaoExists = await prisma.tipoManutencao.findUnique({ where: { id: parseInt(id) } });
        if (!tipoManutencaoExists) {
            return res.status(404).json({ message: 'Tipo de manutenção não encontrado' });
        }

        await prisma.tipoManutencao.delete({ where: { id: parseInt(id) } });
        res.status(201).json({ message: 'Tipo de manutenção deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar tipo de manutenção: ' + error });
    }
};


  module.exports = {createTipoManutencao, listarTipoManutencao, deleteTipoManutencao};
