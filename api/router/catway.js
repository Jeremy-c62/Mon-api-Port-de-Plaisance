const express = require('express');
const router = express.Router();
const catwayController = require('../controllers/catway');  // Assurez-vous que le chemin est correct
const Catway = require('../models/catway')


router.post('/catways', async (req, res) => {
    try {
        const { catwayNumber, catwayType, catwayState, description } = req.body;
        const catway = new Catway({ catwayNumber, catwayType, catwayState, description });
        await catway.save();
        res.status(201).json(catway);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Récupérer tous les catways
router.get('/catways', async (req, res) => {
    try {
        const catways = await Catway.find();
        res.status(200).json(catways);
    } catch (error) {
        console.error('Erreur lors de la récupération des catways:', error);
        res.status(500).json({ message: error.message });
    }
});

// Récupérer un catway par son id
router.get('/catways/:id', async (req, res) => {
    try {
        const catway = await Catway.findById(req.params.id);
        if (!catway) return res.status(404).json({ message: 'Catway not found' });
        res.status(200).json(catway);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Mettre à jour un catway
router.put('/catways/:id', async (req, res) => {
    try {
        const catway = await Catway.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!catway) return res.status(404).json({ message: 'Catway not found' });
        res.status(200).json(catway);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Supprimer un catway
router.delete('/catways/:id', async (req, res) => {
    try {
        const catway = await Catway.findByIdAndDelete(req.params.id);
        if (!catway) return res.status(404).json({ message: 'Catway not found' });
        res.status(200).json({ message: 'Catway deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;