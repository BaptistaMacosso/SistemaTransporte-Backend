const express = require('express');
const { 
    registerUser, 
    loginUser, 
    getUserProfile, 
    listarUser, 
    getUserById, 
    updateUserProfile, 
    updateUser, 
    deleteUser 
} = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

// Rotas de usuários
router.post('/register', registerUser);
router.get('/listar',protect, listarUser);
router.post('/login', loginUser);
router.get('/listarPeloId/:id', getUserById);
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);
router.put('/update/:id', protect, updateUser);
router.delete('/delete/:id', deleteUser);


module.exports = router;