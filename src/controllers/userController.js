const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Registrar usuário
const registerUser = async (req, res) => {
  try {
    const { userNome, userEmail, userPassword, tipoUsuarioId } = req.body;

    if (!userNome || !userEmail || !userPassword || !tipoUsuarioId) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    const userExists = await prisma.user.findUnique({ where: { userEmail } }); 
    if (userExists) {
      return res.status(400).json({ message: 'Usuário já existe' });
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
        tipoUsuarioId: tipoUsuarioId,
      },
    });

    res.status(201).json({
      id: user.userId,
      name: user.userNome,
      email: user.userEmail,
      tipoUsuarioId: user.tipoUsuarioId,
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao registrar o usuário '+error });
  }
};

//Lista de Usuários
const listarUser = async (req, res) => {
  try {
    // Run inside `async` function
    const allUsers = await prisma.user.findMany({
      select: {
        userId: true,
        userNome: true,
        userEmail: true,
        tipoUser:{
          select:{
            descricaoTipo: true
          }
        }
      },
    });
    res.status(200).json({
      allUsers: allUsers,
    });

  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar os usuários '+error });
  }
}

// Fazer login
const loginUser = async (req, res) => {
  const { userEmail, userPassword } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { userEmail: userEmail } });
    console.log('Usuário: '+user.userNome+' - '+user.userEmail);
    
    if (!user) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }
    
    // Comparar senha usando bcrypt
    const isMatch = await bcrypt.compare(userPassword, user.userPassword);

    if (!isMatch) {
      return res.status(401).json({ message: 'Usuário não autorizado' });
    }

    res.status(201).json({ token: generateToken(user.userId, user.userNome) });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao fazer login' });
  }
};

// Atualizar perfil de usuário
const updateUserProfile = async (req, res) => {
  try {
    const { userNome, userEmail, userPassword, tipoUsuarioId } = req.body;
    const user = await prisma.user.update({
      where: { userId: req.user.id },
      data: {
        userNome,
        userEmail,
        userPassword: userPassword ? await bcrypt.hash(userPassword, await bcrypt.genSalt(10)) : undefined,
        tipoUser: tipoUsuarioId ? { connect: { id: tipoUsuarioId } } : undefined,
      },
    });

    res.json({
      id: user.userId,
      name: user.userNome,
      email: user.userEmail,
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar perfil' });
  }
};

// Atualizar perfil de usuário
const updateUser = async (req, res) => {
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

    res.status(201).json({message: 'Usuário atualizado com sucesso.', user});
  } catch (error) {
    res.status(500).json({ message: 'Erro: Não foi possível atualizar o usuário.' });
  }
};


// Obter perfil de usuário
const getUserProfile = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
    });

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter perfil' });
  }
};

//Deletar Usuário
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const userExists = await prisma.user.findUnique({ where: { userId: parseInt(id) } });
    if (!userExists) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    await prisma.user.delete({ where: { userId: parseInt(id) } });
    res.status(201).json({ message: 'Usuário deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar usuário: ' + error });
  }
};


//Pegar Usuário pelo Id
const getUserById = async (req, res) => {
  const { id } = req.body;

  try {
    const user = await prisma.user.findFirst({ where: { id }, });
    
    res.json({
      id: user.userId,
      nome: user.userNome,
      email: user.userEmail,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao listar o usuário pelo Id '+error });
  }
}

// Gerar token JWT
const generateToken = (id, nome) => {
  return jwt.sign({ id, nome }, process.env.JWT_SECRET, {
    expiresIn: '8h',
  });
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  updateUser,
  listarUser,
  getUserById,
  deleteUser
};