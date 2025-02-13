const express = require('express');
const router = express.Router();
const catwayController = require('../controllers/catway');  // Assurez-vous que le chemin est correct

// Récupérer la liste de tous les catways
router.get('/', catwayController.getCatways.getCatwaysByType);

// Récupérer un catway par son ID
router.get('/:id', catwayController.getCatwayById);

// Créer un nouveau catway
router.post('/', catwayController.createCatway);

// Modifier un catway par son ID
router.put('/:id', catwayController.updateCatway);

// Supprimer un catway par son ID
router.delete('/:id', catwayController.deleteCatway);


module.exports = router;