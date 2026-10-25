const express = require('express');
const router = express.Router();
const {
    getAllArticles,
    getArticleById,
    getMyArticles,
    createArticle,
    updateArticle,
    deleteArticle
} = require('../controller/articleController');

const { protect } = require('../middlewares/authMiddleware');

// Consultation publique
router.get('/', getAllArticles);

// articles de l'utilisateur connecte (avant /:id)
router.get('/my-articles', protect, getMyArticles);

router.get('/:id', getArticleById);

// Operations d'ecriture protegees par authentification JWT
router.post('/', protect, createArticle);
router.put('/:id', protect, updateArticle);
router.delete('/:id', protect, deleteArticle);

module.exports = router;
