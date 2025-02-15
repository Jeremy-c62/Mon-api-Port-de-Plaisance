require('dotenv').config();
require('./connect');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const userRoutes = require('./router/user');
const app = express();
const Reservation = require('./models/reservation');
const Catway = require('./models/catway');

app.use(cors({
    origin: 'http://localhost:3000',  // Autoriser les requêtes depuis localhost:3000 (React)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Autoriser ces méthodes HTTP
    allowedHeaders: ['Content-Type']  // Autoriser les en-têtes spécifiques si nécessaire
}));

app.use(express.json());
app.use(helmet());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limite à 100 requêtes par IP
});
app.use(limiter);

// Route pour les utilisateurs
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.send('Bienvenue sur l\'API');
});

// Middleware pour gérer les erreurs 404
app.use((req, res) => {
    res.status(404).json({ message: 'Route non trouvée' });
});

// Middleware pour gérer les erreurs générales
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: 'Erreur interne du serveur' });
});
// Ajoutez cette route à votre app.js
app.get('/api/catways', async (req, res) => {
    const { catwayType } = req.query;

    try {
        // Recherche des catways correspondant au type demandé (long ou short)
        const catways = await Catway.find({ catwayType, catwayState: 'bon état' });

        if (!catways.length) {
            return res.status(404).json({ message: 'Aucun catway disponible pour ce type.' });
        }

        res.status(200).json(catways);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des catways', error });
    }
});
app.post('/checkAvailability', async (req, res) => {
    const { catwayNumber, startDate, endDate } = req.body;

    try {
        // Recherche des réservations pour le même catway qui chevauchent les dates fournies
        const reservations = await Reservation.find({
            catwayNumber,
            $or: [
                { startDate: { $lte: endDate }, endDate: { $gte: startDate } }
            ]
        });

        if (reservations.length > 0) {
            // S'il y a des réservations chevauchantes
            return res.status(400).json({ message: 'Ce catway est déjà réservé à ces dates.' });
        } else {
            // Si aucun conflit
            return res.status(200).json({ message: 'Ce catway est disponible.' });
        }
    } catch (error) {
        console.error('Erreur lors de la vérification de la disponibilité :', error);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
});

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(process.env.PORT || 8080, () => {
            console.log(`Serveur démarré sur http://localhost:${process.env.PORT || 8080}`);
        });
    })
    .catch(err => console.error('Erreur de connexion à MongoDB:', err));