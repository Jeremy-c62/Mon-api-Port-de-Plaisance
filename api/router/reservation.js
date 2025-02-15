
const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservation');
const Reservation = require('../models/reservation');


// Récupérer toutes les réservations pour un catway spécifique
router.get('/reservations', reservationController.getReservations);



router.post('/reservation', async (req, res) => {
    const { catwayNumber, boatName, clientName, startDate, endDate } = req.body;

    // Vérifier que tous les champs nécessaires sont fournis
    if (!catwayNumber || !boatName || !clientName || !startDate || !endDate) {
        return res.status(400).json({ message: 'Tous les champs sont requis' });
    }

    try {
        // Vérifier si le catway est déjà réservé pendant cette période
        const existingReservation = await Reservation.findOne({
            catwayNumber,
            $or: [
                { startDate: { $lte: endDate }, endDate: { $gte: startDate } }
            ]
        });

        if (existingReservation) {
            return res.status(400).json({ message: 'Ce catway est déjà réservé à ces dates.' });
        }

        // Créer une nouvelle réservation
        const newReservation = new Reservation({
            catwayNumber,
            boatName,
            clientName,
            startDate,
            endDate
        });

        // Sauvegarder la nouvelle réservation dans la base de données
        await newReservation.save();
        res.status(201).json(newReservation);
    } catch (error) {
        console.error('Erreur lors de la création de la réservation:', error);
        res.status(500).json({ message: 'Erreur lors de la création de la réservation', error: error.message });
    }
});

// Modifier une réservation spécifique pour un catway spécifique
router.put('/catways/:id/reservations/:idReservation', reservationController.updateReservation);

// Supprimer une réservation spécifique pour un catway spécifique
router.delete('/catways/:id/reservations/:idReservation', reservationController.deleteReservation);

module.exports = router;