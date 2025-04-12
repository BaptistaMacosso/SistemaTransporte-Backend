const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


module.exports = {
    //Nova Viatura
    async createViatura(req, res) {
        const { viaturaTipoId, viaturaCategoriaId, viaturaMarca, viaturaModelo, viaturaMatricula,
          viaturaAnoFabrica, viaturaCombustivel, viaturaCor, quilometragem } = req.body;
      
        if (!viaturaTipoId || !viaturaCategoriaId || !viaturaMarca || !viaturaModelo || !viaturaMatricula 
          || !viaturaAnoFabrica || !viaturaCombustivel || !viaturaCor || !quilometragem) {
          return res.status(409).json({ message: 'Todos os campos são obrigatórios.' });
        }
      
        if (isNaN(Number(quilometragem)) || isNaN(Number(viaturaAnoFabrica))) {
          return res.status(409).json({ message: 'Ano de fábrica e quilometragem devem ser números.' });
        }
      
        try {
          const tipoExiste = await prisma.viaturaTipo.findUnique({ where: { id: Number(viaturaTipoId) } });
          const categoriaExiste = await prisma.viaturaCategoria.findUnique({ where: { id: Number(viaturaCategoriaId) } });
      
          if (!tipoExiste || !categoriaExiste) {
            return res.status(404).json({ message: 'Tipo ou Categoria não encontrada.' });
          }
      
          const viaturaExists = await prisma.viatura.findUnique({ where: { viaturaMatricula } });
          if (viaturaExists) {
            return res.status(400).json({ message: 'Viatura já cadastrada.' });
          }
      
          const novaViatura = await prisma.viatura.create({
            data: {
              viaturaTipoId: Number(viaturaTipoId),
              viaturaCategoriaId: Number(viaturaCategoriaId),
              viaturaMarca: viaturaMarca,
              viaturaModelo: viaturaModelo,
              viaturaMatricula: viaturaMatricula,
              viaturaAnoFabrica: String(viaturaAnoFabrica),
              viaturaCombustivel: viaturaCombustivel,
              viaturaCor:viaturaCor,
              quilometragem: Number(quilometragem),
            },
          });
      
          return res.status(201).json({ message: 'Viatura cadastrada com sucesso.', novaViatura });
      
        } catch (error) {
          console.error("Erro ao criar viatura:", error);
          return res.status(500).json({ message: 'Erro ao criar o registo, por favor verifique a console.', error:{
            name: error.name,
            message: error.message
          } });
        }
      },

    // Obter todas as viaturas
    async getAllViaturas (req, res){  
        try {
            const todasViaturas = await prisma.Viatura.findMany({orderBy: { viaturaId: 'asc', },
                select:{
                    viaturaId: true,
                    viaturaTipoId: true,
                    viaturaCategoriaId: true,
                    viaturaMarca: true,
                    viaturaModelo: true,
                    viaturaMatricula: true,
                    viaturaAnoFabrica: true,
                    viaturaCombustivel: true,
                    viaturaCor: true,
                    quilometragem: true,
                    viaturaTipo:{
                        select:{
                            id: true,
                            viaturaTipo: true
                        }
                    },
                    viaturaCategoria:{
                        select:{
                            id: true,
                            viaturaCategoria: true
                        }
                    }
                }
            });
            return res.status(200).json({ viaturas: todasViaturas });
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao listar as viaturas, por favor verifique a console.', error });
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
            return res.status(200).json({viatura: viatura});
        }catch (error) {
            return res.status(500).json({ message: 'Erro ao listar a viatura, por favor verifique a console. ',error });
        }
    },

    // Obter uma viatura por ID
    async getViaturaByMatricula (req, res){
        const { nrMatricula } = req.params;
        const matriculaFormatada = nrMatricula.trim().toUpperCase();

        try {
            const viatura = await prisma.viatura.findUnique({ where: { viaturaMatricula: matriculaFormatada },
                include: {
                viaturaTipo: true,
                viaturaCategoria: true,
            }});

            //Se não encontrar viatura.
            if (!viatura) {
                return res.status(404).json({ message: 'Viatura não encontrada.' });
            }
            return res.status(200).json({viatura: viatura});
        }catch (error) {
            console.error('Erro ao buscar viatura:', error);
            return res.status(500).json({ message: 'Erro ao pesquisar viatura pela matrícula, por favor verifique a console.', error});
        }
    },

    // Atualizar uma viatura por ID
    async updateViatura (req, res){
        const { id } = req.params;
        const { viaturaTipoId, viaturaCategoriaId, viaturaMarca, viaturaModelo, viaturaMatricula,
                viaturaAnoFabrica, viaturaCombustivel, viaturaCor, quilometragem
            } = req.body;

        //Verificação
        if (!viaturaTipoId || !viaturaCategoriaId || !viaturaMarca || !viaturaModelo || !viaturaMatricula 
        || !viaturaAnoFabrica || !viaturaCombustivel || !viaturaCor || !quilometragem) {
            return res.status(409).json({ message: 'Todos os campos são de preenchimento obrigatório.' });
        };

        try {
            if (isNaN(Number(quilometragem)) || isNaN(Number(viaturaAnoFabrica))) {
                return res.status(409).json({ message: 'Ano de fábrica e quilometragem devem ser números.' });
            };
              
            const tipoExiste = await prisma.viaturaTipo.findUnique({ where: { id: Number(viaturaTipoId) } });
            const categoriaExiste = await prisma.viaturaCategoria.findUnique({ where: { id: Number(viaturaCategoriaId) } });  
            if (!tipoExiste || !categoriaExiste) {
                return res.status(404).json({ message: 'Tipo ou Categoria não encontrada.' });
            };

            const viaturaExists = await prisma.viatura.findUnique({ where: { viaturaId: parseInt(id) } });
            if (!viaturaExists) {
                return res.status(404).json({ message: 'Viatura não encontrada.' });
            }

            const viaturaAtualizada = await prisma.viatura.update({where: { viaturaId: parseInt(id) },
                data:{
                    viaturaTipoId: Number(viaturaTipoId),
                    viaturaCategoriaId: Number(viaturaCategoriaId),
                    viaturaMarca: viaturaMarca,
                    viaturaModelo: viaturaModelo,
                    viaturaMatricula: viaturaMatricula,
                    viaturaAnoFabrica: String(viaturaAnoFabrica),
                    viaturaCombustivel: viaturaCombustivel,
                    viaturaCor:viaturaCor,
                    quilometragem: Number(quilometragem),
                }
              });

            return res.status(201).json({ message: 'Viatura atualizada com sucesso.', viaturaAtualizada });
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao atualizar o registo, por favor verifique a console.',error });
        }
    },

    // Deletar uma viatura por ID
    async deleteViatura (req, res) {
        const { id } = req.params;

        try {
            const viaturaExists = await prisma.viatura.findUnique({ where: { viaturaId: parseInt(id) } });
            if (!viaturaExists) {
                return res.status(404).json({ message: 'Viatura não encontrada.' });
            }

            const viaturaDeleted = await prisma.viatura.delete({ where: { viaturaId: parseInt(id) } });
            return res.status(200).json({ message: 'Viatura deletada com sucesso.', viaturaDeleted });
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao deletar o registo, por favor verifique a console.',error });
        }
    },
};
