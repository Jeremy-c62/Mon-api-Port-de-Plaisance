
const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservation');

// Récupérer toutes les réservations pour un catway spécifique
router.get('/catways/:id/reservations', reservationController.getReservations);

// Créer une nouvelle réservation pour un catway spécifique
router.post('/catways/:id/reservations', reservationController.createReservation);

// Modifier une réservation spécifique pour un catway spécifique
router.put('/catways/:id/reservations/:idReservation', reservationController.updateReservation);

// Supprimer une réservation spécifique pour un catway spécifique
router.delete('/catways/:id/reservations/:idReservation', reservationController.deleteReservation);

module.exports = router;