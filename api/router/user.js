const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');  // Vérifie que ce chemin est correct
const passwordValidator = require('../middlewares/passwordValidator');
const auth = require('../middlewares/auth');

// Routes POST pour l'inscription et la connexion
router.post('/register', passwordValidator, userCtrl.register);  // Inscription
router.post('/login', userCtrl.login);  // Connexion
router.get('/home', auth, userCtrl.home);  // Page d'accueil protégée

// CRUD Routes utilisateurs
router.get('/userr/users', userCtrl.getAllUsers);           // READ: Récupérer tous les utilisateurs
router.get('/users/:id', userCtrl.getUserById);       // READ: Récupérer un utilisateur par ID
router.put('/users/:id', userCtrl.updateUser);        // UPDATE: Mettre à jour un utilisateur par ID
router.delete('/user/', userCtrl.deleteUserByEmail);  // DELETE: Supprimer un utilisateur par email

module.exports = router;