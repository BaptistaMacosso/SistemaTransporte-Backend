const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createPublicidade = async (req, res) => {
    const { 
        titulo, 
        descricao, 
        imagem, 
        link, 
        dataInicio, 
        dataTermino, 
        status
    } = req.body;

    if (!titulo || !descricao || !imagem || !link || !dataInicio || !dataTermino || !status) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    try {
        const publicidade = await prisma.publicidade.create({
            data: {
                titulo,
                descricao,
                imagem,
                link,
                dataInicio,
                dataTermino,
                status
            }
        });

        res.status(201).json({ message: 'Publicidade cadastrada com sucesso', publicidade });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao cadastrar publicidade: ' + error });
    }
};

const listarPublicidade = async (req, res) => {
    try {
        const publicidade = await prisma.publicidade.findMany();
        res.status(200).json({ publicidade });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao listar publicidade: ' + error });
    }
};

const getPublicidadeById = async (req, res) => {
    const { id } = req.params;

    try {
        const publicidade = await prisma.publicidade.findUnique({ where: { publicidadeId: parseInt(id) } });
        if (!publicidade) {
            return res.status(404).json({ message: 'Publicidade não encontrada' });
        }
        res.json(publicidade);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar publicidade: ' + error });
    }
};

const updatePublicidade = async (req, res) => {
    const { id } = req.params;
    const { titulo, descricao, imagem, link, dataInicio, dataTermino, status } = req.body;

    try {
        const publicidadeExists = await prisma.publicidade.findUnique({ where: { publicidadeId: parseInt(id) } });
        if (!publicidadeExists) {
            return res.status(404).json({ message: 'Publicidade não encontrada' });
        }

        const updatedPublicidade = await prisma.publicidade.update({
            where: { publicidadeId: parseInt(id) },
            data: {
                titulo,
                descricao,
                imagem,
                link,
                dataInicio,
                dataTermino,
                status
            }
        });

        res.json({ message: 'Publicidade atualizada com sucesso', updatedPublicidade });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar publicidade: ' + error });
    }
};

const deletePublicidade = async (req, res) => {
    const { id } = req.params;

    try {
        const publicidadeExists = await prisma.publicidade.findUnique({ where: { publicidadeId: parseInt(id) } });
        if (!publicidadeExists) {
            return res.status(404).json({ message: 'Publicidade não encontrada' });
        }

        await prisma.publicidade.delete({ where: { publicidadeId: parseInt(id) } });
        res.json({ message: 'Publicidade deletada com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar publicidade: ' + error });
    }
};


module.exports = { createPublicidade, listarPublicidade, getPublicidadeById, updatePublicidade, deletePublicidade };
