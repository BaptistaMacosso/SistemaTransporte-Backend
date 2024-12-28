const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


module.exports = {
    //Nova Viatura
    async createViatura(req, res){
        const { viaturaTipoId, viaturaCategoriaId, viaturaMarca, viaturaModelo, viaturaMatricula,
                viaturaAnoFabrica, viaturaCombustivel, viaturaCor, quilometragem
            } = req.body;

        //Verificação
        if (!viaturaTipoId || !viaturaCategoriaId || !viaturaMarca || !viaturaModelo || !viaturaMatricula 
        || !viaturaAnoFabrica || !viaturaCombustivel || !viaturaCor || !quilometragem) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
        }

        try {
            const viaturaExists = await prisma.viatura.findUnique({ where: { viaturaMatricula: viaturaMatricula } });
            if (viaturaExists) {
                return res.status(400).json({ message: 'Viatura já cadastrada' });
            }
            
            const novaViatura = await prisma.viatura.create({
                data: {
                viaturaTipoId: viaturaTipoId,
                viaturaCategoriaId: viaturaCategoriaId,
                viaturaMarca: viaturaMarca,
                viaturaModelo: viaturaModelo,
                viaturaMatricula: viaturaMatricula,
                viaturaAnoFabrica: viaturaAnoFabrica,
                viaturaCombustivel: viaturaCombustivel,
                viaturaCor: viaturaCor,
                quilometragem: quilometragem,
                },
            });

            res.status(201).json({ message: 'Viatura cadastrada com sucesso.', novaViatura });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao cadastrar viatura: ' + error });
        }
    },

    // Obter todas as viaturas
    async getAllViaturas (req, res){
        
        try {
            const todasViaturas = await prisma.viatura.findMany({
                include: {
                viaturaTipo: true,
                viaturaCategoria: true,
                },
            });
            console.log('Lista de viaturas: '+todasViaturas);
            res.status(200).json({ viaturas: todasViaturas });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao listar viaturas: ' + error });
        }
    },

    // Obter uma viatura por ID
    async getViaturaById (req, res){
        const { id } = req.params;

        try {
            const viatura = await prisma.viatura.findUnique({ where: { viaturaId: parseInt(id) },
                include: {
                viaturaTipo: true,
                viaturaCategoria: true,
                },
            });

            //Se não encontrar viatura.
            if (!viatura) {
                return res.status(404).json({ message: 'Viatura não encontrada.' });
            }
            res.status(200).json({viatura: viatura});
        }catch (error) {
            res.status(500).json({ message: 'Erro ao listar viaturas: ' + error });
        }
    },

    // Atualizar uma viatura por ID
    async updateViatura (req, res){
        const { id } = req.params;
        const data = req.body;

        try {
            const viaturaExists = await prisma.viatura.findUnique({ where: { viaturaId: parseInt(id) } });
            if (!viaturaExists) {
                return res.status(404).json({ message: 'Viatura não encontrada.' });
            }

            const viaturaAtualizada = await prisma.viatura.update({
                where: { viaturaId: parseInt(id) },
                data,
              });

            res.status(201).json({ message: 'Viatura atualizada com sucesso.', viaturaAtualizada });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao atualizar viatura: ' + error });
        }
    },

    // Deletar uma viatura por ID
    async deleteViatura (req, res) {
        const { id } = req.params;

        try {
            const viaturaExists = await prisma.viatura.findUnique({ where: { viaturaId: parseInt(id) } });
            if (!viaturaExists) {
                return res.status(404).json({ message: 'Viatura não encontrada' });
            }

            await prisma.viatura.delete({ where: { viaturaId: parseInt(id) } });
            res.status(200).json({ message: 'Viatura deletada com sucesso.' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao deletar viatura: ' + error });
        }
    },
};
