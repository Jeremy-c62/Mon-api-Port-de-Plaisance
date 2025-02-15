const express = require('express');
const router = express.Router();
const Catway = require('../models/catway')
const mongoose = require('mongoose');
const isValidId = mongoose.Types.ObjectId.isValid;

router.post('/catways', async (req, res) => {
    try {
        const { catwayNumber, catwayType, catwayState, } = req.body;
        const catway = new Catway({ catwayNumber, catwayType, catwayState, });
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
    const { id } = req.params;
    if (!isValidId(id)) {
        return res.status(400).json({ message: 'ID invalide' });
    }
    try {
        const catway = await Catway.findById(id);
        if (!catway) return res.status(404).json({ message: 'Catway Introuvable' });
        res.status(200).json(catway);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Mettre à jour un catway
router.put('/catways/:id', async (req, res) => {
    try {
        const catway = await Catway.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!catway) return res.status(404).json({ message: 'Catway Introuvable' });
        res.status(200).json(catway);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Supprimer un catway
router.delete('/catways/:id', async (req, res) => {
    try {
        const catway = await Catway.findByIdAndDelete(req.params.id);
        if (!catway)
            return res.status(404).json({ message: 'Catway Introuvable' });
        res.status(200).json({ message: 'Catway Suprimer' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;