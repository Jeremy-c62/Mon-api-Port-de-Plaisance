require('dotenv').config();
require('./connect');
const express = require('express');
const app = express();
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const helmet = require('helmet');

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

const userRoute = require('./router/user');  // Assure-toi que ton fichier de routes 'user.js' est correct
app.use('/api', userRoute);  // Préfixe les routes utilisateur avec '/api'

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

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});