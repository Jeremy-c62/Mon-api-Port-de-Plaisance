const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const passwordValidator = require('../middlewares/passwordValidator')
const auth = require('../middlewares/auth');

// Routes POST pour l'inscription et la connexion
router.post('/register', passwordValidator, userCtrl.register);
router.post('/login', userCtrl.login);
router.get('/home', auth, userCtrl.home);

module.exports = router;