const authToken = require('../middlewares/auth');
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
// Registrar usuário
async registerUser (req, res) {
  try {
    const { userNome, userEmail, userPassword, tipoUsuarioId, grupoUsuarioId } = req.body;
    //Verificação
    if (!userNome || !userEmail || !userPassword || !tipoUsuarioId || !grupoUsuarioId) {
        return res.status(409).json({ message: 'Todos os campos são obrigatórios' });
    }

    const userExists = await prisma.user.findUnique({ where: { userEmail } }); 
    if (userExists) {
      return res.status(409).json({ message: 'Usuário já existe.' });
    }
    
    // Hash da senha usando bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userPassword, salt);
    
    // Cria o usuário no banco de dados
    const user = await prisma.user.create({
      data: {
        userNome: userNome,
        userEmail: userEmail,
        userPassword: hashedPassword,
        tipoUser: {
          connect: { tipoId: tipoUsuarioId } // ID existente no TipoUser
        },
        grupoUser: {
          connect: { grupoId: grupoUsuarioId } // ID existente no GrupoUser
        }
      },
    });

    return res.status(201).json({message: 'Usuário registrado com sucesso.', user});
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao registrar o usuário, por favor verifique a console.',error });
  }
},

//Lista de Usuários
async listarUser (req, res) {
  try {
    // Run inside `async` function
    const allUsers = await prisma.user.findMany({orderBy: { userId: 'asc', },
      select: {
        userId: true,
        userNome: true,
        userEmail: true,
        tipoUser:{
          select:{
            descricaoTipo: true
          }
        },
        grupoUser:{
          select:{
            grupoName: true,
            descricao: true
          }
        }
      },
    });
    return res.status(200).json({ allUsers: allUsers });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao listar os usuários, por favor verifique a console.',error });
  }
},

// Fazer login
async loginUser (req, res) {
  const { userEmail, userPassword } = req.body;

  try {
    // Verifique se os dados foram enviados corretamente
    if (!userEmail || !userPassword) {
      return res.status(409).json({ message: 'Campos obrigatórios não preenchidos.' });
    }

    const user = await prisma.user.findUnique({ where: { userEmail: userEmail } });
    if (!user) {
      return res.status(404).json({ message: 'Falha na autenticação.' });
    }
    
    // Comparar senha usando bcrypt
    const isMatch = await bcrypt.compare(userPassword, user.userPassword);
    
    if (!isMatch) {
      return res.status(401).json({ message: 'Falha na autenticação.' });
    }
    const token = await authToken.GenerateToken(user.userId, user.userNome);
    return res.status(201).json({ token: token });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao efectuar o login do usuário, por favor verifique a console.',error });
  }
},

// Atualizar perfil de usuário
async updateUserProfile (req, res){
  try {
    const { userNome, userEmail, userPassword, tipoUsuarioId, GrupoUsuarioId } = req.body;
    const user = await prisma.user.update({
      where: { userId: req.user.id },
      data: {
        userNome,
        userEmail,
        userPassword: userPassword ? await bcrypt.hash(userPassword, await bcrypt.genSalt(10)) : undefined,
        tipoUser: tipoUsuarioId ? { connect: { id: tipoUsuarioId } } : undefined,
        GrupoUser: GrupoUsuarioId ? { connect: { id: GrupoUsuarioId } } : undefined,
      },
    });

    return res.status(201).json({message: 'Perfil actualizado com sucesso.', user});
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao actualizar perfil do usuário.'+error });
  }
},

// Atualizar perfil de usuário
async updateUser (req, res){
  try {
    const { id } = req.params;
    const { userNome, userEmail } = req.body;
    const user = await prisma.user.update({
      where: { userId: parseInt(id) },
      data: {
        userNome,
        userEmail
      },
    });

    return res.status(201).json({message: 'Usuário atualizado com sucesso.', user});
  } catch (error) {
    return res.status(500).json({ message: 'Erro: Não foi possível atualizar o usuário.' });
  }
},

// Obter perfil de usuário
async getUserProfile (req, res){
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.id }});
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    };

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter perfil do usuário, por favor verifique a console.', error});
  }
},

//Deletar Usuário
async deleteUser (req, res){
  const { id } = req.params;

  try {
    const userExists = await prisma.user.findUnique({ where: { userId: parseInt(id) } });
    if (!userExists) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    };

    const userDeleted = await prisma.user.delete({ where: { userId: parseInt(id) } });
    return res.status(200).json({ message: 'Usuário deletado com sucesso.',userDeleted });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao deletar usuário, por favor verifique a console.',error });
  }
},

//Alterar Password Usuário
async alterarPasswordUser (req, res){
  const { id } = req.params;
  const { newPassword, oldPassword } = req.body;

  try {
    const userExists = await prisma.user.findUnique({ where: { userId: parseInt(id) } });
    if (!userExists) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    };

    // Comparar senha usando bcrypt
    const isMatch = await bcrypt.compare(oldPassword, userExists.userPassword);
    if (!isMatch) {
      return res.status(409).json({ message: 'A senha antiga está incorreta. Tente novamente.' });
    };

    // Hash da senha usando bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);


    //Password Alterada
    await prisma.user.update({where: { userId: parseInt(id) },
      data: { userPassword: hashedPassword },
    });
    return res.status(200).json({ message: 'Senha do usuário alterada com sucesso.' });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao alterar a senha do usuário, por favor verifique a console.',error });
  }
},


//Pegar Usuário pelo Id
async getUserById (req, res){
  try {
    const { id } = req.params;
    //Verificação
    if(!user){ return res.status(404).json({message: "Usuário não encontrado."}); }
    const user = await prisma.user.findUnique({ where: { userId: parseInt(id) }, 
      select: {
        userId: true,
        userNome: true,
        userEmail: true,
        tipoUsuarioId: true,
        tipoUser:{
          select:{
            descricaoTipo: true
          }
        },
        grupoUser:{
          select:{
            grupoName: true,
            descricao: true
          }
        }
      }
    });
    return res.status(200).json({user: user});
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao listar o usuário pelo Id, por favor verifique a console.',error });
  }
},};
