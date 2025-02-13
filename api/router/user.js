const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');  // Vérifie que ce chemin est correct
const passwordValidator = require('../middlewares/passwordValidator');
const auth = require('../middlewares/auth');

// Routes POST pour l'inscription et la connexion
router.post('/register', passwordValidator, userCtrl.register);
router.post('/login', userCtrl.login);
router.get('/home', auth, userCtrl.home);

// CRUD Routes
router.get('/', userCtrl.getAllUsers);         // READ: Récupérer tous les utilisateurs
router.get('/:id', userCtrl.getUserById);      // READ: Récupérer un utilisateur par ID
router.put('/:id', userCtrl.updateUser);       // UPDATE: Mettre à jour un utilisateur
router.delete('/:id', userCtrl.deleteUser);    // DELETE: Supprimer un utilisateur

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    User.findByIdAndDelete(id)
        .then(deletedUser => {
            if (!deletedUser) {
                return res.status(404).json({ message: 'Utilisateur non trouvé' });
            }
            res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
        })
        .catch(err => {
            console.error('Erreur lors de la suppression de l\'utilisateur:', err);
            res.status(500).json({ error: 'Erreur interne lors de la suppression de l\'utilisateur' });
        });
});


module.exports = router;