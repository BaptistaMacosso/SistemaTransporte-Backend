const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createManutencao = async (req, res) => {
    const { 
        viaturaId,
        tipoId,
        data,
        quilometragem,
        descricao,
        servicos,
        responsavel,
    } = req.body;

    if (!viaturaId || !tipoId || !data || !quilometragem || !descricao || !servicos || !responsavel) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    try {
        const manutencao = await prisma.manutencao.create({
            data: {
                viaturaId: viaturaId,
                tipoId: tipoId,
                data: data,
                quilometragem: quilometragem,
                descricao: descricao,
                servicos: servicos,
                responsavel: responsavel,
            }
        });

        res.status(201).json({ message: 'Manutenção cadastrada com sucesso', manutencao });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao cadastrar manutenção: ' + error });
    }
};

const listarManutencao = async (req, res) => {
    try {
        const manutencao = await prisma.manutencao.findMany({
            select:{
                id: true,
                viaturaId: true,
                tipoId: true,
                data: true,
                quilometragem: true,
                descricao: true,
                servicos: true,
                responsavel: true,
                viatura:{
                    select:{
                        viaturaId: true,
                        viaturaMarca: true,
                        viaturaModelo: true,
                        viaturaMatricula: true,
                    }
                },
                tipo:{
                    select:{
                        nome: true,
                    }
                }
            }
        });
        res.status(200).json({ allmanutencao: manutencao });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao listar manutenções: ' + error });
    }
};

const deleteManutencao = async (req, res) => {
    const { id } = req.params;

    try {
        const manutencaoExists = await prisma.manutencao.findUnique({ where: { id: parseInt(id) } });
        if (!manutencaoExists) {
            return res.status(404).json({ message: 'Manutenção não encontrada.' });
        }

        await prisma.manutencao.delete({ where: { id: parseInt(id) } });
        res.status(201).json({ message: 'Manutenção deletada com sucesso.' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar manutenção: ' + error });
    }
};


module.exports = { createManutencao, listarManutencao, deleteManutencao };
