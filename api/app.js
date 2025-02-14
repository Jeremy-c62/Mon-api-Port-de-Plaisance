require('dotenv').config();
require('./connect');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const userRoutes = require('./router/user');
const app = express();

app.use(cors({
    origin: 'http://localhost:3000',  // Autoriser les requêtes depuis localhost:3000 (React)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Autoriser ces méthodes HTTP
    allowedHeaders: ['Content-Type']  // Autoriser les en-têtes spécifiques si nécessaire
}));

app.use(express.json());
app.use(helmet());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20, // Limiter à 20 requêtes par IP
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

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(process.env.PORT || 8080, () => {
            console.log(`Serveur démarré sur http://localhost:${process.env.PORT || 8080}`);
        });
    })
    .catch(err => console.error('Erreur de connexion à MongoDB:', err));