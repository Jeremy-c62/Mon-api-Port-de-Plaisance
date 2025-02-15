const Reservation = require('../models/reservation');
const Catway = require('../models/catway');  // Assure-toi d'importer ton modèle Catway

// Liste des états qui empêchent une réservation
const invalidCatwayStates = [
    'En cours de réparation',
    'Plusieurs grandes tâches de peinture',
    'grosse tâche d\'huile',
    'planche bouge'
];

// Récupérer toutes les réservations pour un catway spécifique
exports.getReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find({ catwayNumber: req.params.id });
        if (reservations.length === 0) {
            return res.status(404).json({ message: 'Aucune réservation trouvée pour ce catway.' });
        }
        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des réservations', error });
    }
};

// Créer une nouvelle réservation pour un catway spécifique
exports.createReservation = async (req, res) => {
    const reservationData = req.body;
    const { catwayNumber, clientName, boatName, startDate, endDate } = reservationData;

    // Vérification que tous les champs obligatoires sont présents
    if (!catwayNumber || !clientName || !boatName || !startDate || !endDate) {
        return res.status(400).json({ error: 'Les champs catwayNumber, clientName, boatName, startDate et endDate sont obligatoires.' });
    }

    try {
        // Vérification si le catway existe
        const catway = await Catway.findOne({ catwayNumber });
        if (!catway) {
            return res.status(400).json({ error: `Le catway ${catwayNumber} n'existe pas.` });
        }

        // Vérifier si le catway est dans un état qui empêche la réservation
        if (invalidCatwayStates.some(state => catway.catwayState.includes(state))) {
            return res.status(400).json({ error: `Le catway ${catwayNumber} ne peut pas être réservé en raison de son état (${catway.catwayState}).` });
        }

        // Vérification des conflits de réservation
        const overlappingReservations = await Reservation.find({
            catwayNumber: catwayNumber,
            $or: [
                { startDate: { $lte: endDate }, endDate: { $gte: startDate } },
                { startDate: { $gte: startDate }, startDate: { $lte: endDate } }
            ]
        });

        if (overlappingReservations.length > 0) {
            return res.status(400).json({ error: 'Le catway est déjà réservé pendant cette période.' });
        }

        // Si aucune réservation existante et l'état est bon, créer la réservation
        const newReservation = new Reservation({
            catwayNumber,
            clientName,
            boatName,
            startDate,
            endDate
        });
        await newReservation.save();
        res.status(201).json({ message: 'Réservation réussie', reservation: newReservation });

    } catch (error) {
        console.error('Erreur lors de l\'ajout de la réservation:', error);
        res.status(500).json({ error: 'Erreur interne lors de la réservation' });
    }
};

// Modifier une réservation spécifique pour un catway spécifique
exports.updateReservation = async (req, res) => {
    try {
        const updatedReservation = await Reservation.findByIdAndUpdate(req.params.idReservation, req.body, { new: true });
        if (!updatedReservation) {
            return res.status(404).json({ message: 'Réservation non trouvée' });
        }
        res.status(200).json({ message: 'Réservation mise à jour avec succès', reservation: updatedReservation });
    } catch (error) {
        console.error('Erreur lors de la mise à jour de la réservation :', error);
        res.status(500).json({ message: 'Erreur interne lors de la mise à jour de la réservation', error });
    }
};

// Supprimer une réservation spécifique pour un catway spécifique
exports.deleteReservation = async (req, res) => {
    try {
        const deletedReservation = await Reservation.findByIdAndDelete(req.params.idReservation);
        if (!deletedReservation) {
            return res.status(404).json({ message: 'Réservation non trouvée' });
        }
        res.status(200).json({ message: 'Réservation supprimée avec succès' });
    } catch (error) {
        console.error('Erreur lors de la suppression de la réservation :', error);
        res.status(500).json({ message: 'Erreur lors de la suppression de la réservation', error });
    }
};