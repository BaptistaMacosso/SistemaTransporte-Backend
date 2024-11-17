const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createPlanoManutencao = async (req, res) => {
    const { 
        viaturaId,
        dataManutencao,
        descricao,
        custoPrevisto,
        status
    } = req.body;

    if (!viaturaId || !dataManutencao || !descricao || !custoPrevisto || !status) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    try {
        const planoManutencao = await prisma.planoManutencao.create({
            data: {
                viaturaId,
                dataManutencao,
                descricao,
                custoPrevisto,
                status
            }
        });

        res.status(201).json({ message: 'Plano de manutenção cadastrado com sucesso', planoManutencao });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao cadastrar plano de manutenção: ' + error });
    }
};

const listarPlanoManutencao = async (req, res) => {
    try {
        const planoManutencao = await prisma.planoManutencao.findMany({
            select:{
                id: true,
                viaturaId: true,
                dataManutencao: true,
                descricao: true,
                custoPrevisto: true,
                status: true,
                viatura:{
                    select:{
                        viaturaId: true,
                        viaturaMarca: true,
                        viaturaModelo: true,
                        viaturaMatricula: true,
                    }
                }
            }
        });
        res.status(200).json({ allplanos: planoManutencao });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao listar planos de manutenção: ' + error });
    }
};

const updatePlanoManutencao = async (req, res) => {
    const { id } = req.params;
    const { 
        viaturaId,
        dataManutencao,
        descricao,
        custoPrevisto,
        status 
    } = req.body;

    try {
        const planoManutencaoExists = await prisma.planoManutencao.findUnique({ where: { id: parseInt(id) } });
        if (!planoManutencaoExists) {
            return res.status(404).json({ message: 'Plano de manutenção não encontrado' });
        }

        const updatedPlanoManutencao = await prisma.planoManutencao.update({
            where: { id: parseInt(id) },
            data: {
                viaturaId: viaturaId,
                dataManutencao: dataManutencao,
                descricao: descricao,
                custoPrevisto: custoPrevisto,
                status: status
            }
        });

        res.status(201).json({ message: 'Plano de manutenção atualizado com sucesso', updatedPlanoManutencao });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar plano de manutenção: ' + error });
    }
};

const deletePlanoManutencao = async (req, res) => {
    const { id } = req.params;

    try {
        const planoManutencaoExists = await prisma.planoManutencao.findUnique({ where: { id: parseInt(id) } });
        if (!planoManutencaoExists) {
            return res.status(404).json({ message: 'Plano de manutenção não encontrado.' });
        }

        await prisma.planoManutencao.delete({ where: { id: parseInt(id) } });
        res.status(201).json({ message: 'Plano de manutenção deletado com sucesso.' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar plano de manutenção: ' + error });
    }
};


module.exports = { createPlanoManutencao, listarPlanoManutencao, updatePlanoManutencao, deletePlanoManutencao };