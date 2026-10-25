const express = require('express');
const router = express.Router();
const {
    registerUser,
    loginUser,
    getUserProfile,
    getAllUsers,
    updatePassword,
    updateUserRole
} = require('../controller/userController');
const { protect, adminOnly } = require('../middlewares/authMiddleware');

// Routes d'authentification publiques
router.post('/register', registerUser);
router.post('/login', loginUser);

// Route privee protegee par Token JWT
router.get('/profile', protect, getUserProfile);

// mise a jour securisee du mot de passe
router.put('/update-password', protect, updatePassword);

// Route reservee aux administrateurs (JWT valide + role admin requis)
router.get('/', protect, adminOnly, getAllUsers);

// attribution de role (admin uniquement)
router.put('/:id/role', protect, adminOnly, updateUserRole);

module.exports = router;
