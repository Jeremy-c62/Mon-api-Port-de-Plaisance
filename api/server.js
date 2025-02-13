const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');  // Pour le hachage des mots de passe
const userRoutes = require('./router/user');
const reservationRoutes = require('./router/reservation');
const Reservation = require('./models/reservation');
require('dotenv').config(); // Charger les variables d'environnement depuis .env

// Configuration du port
const port = process.env.PORT || 8080;

// Utilisation de bodyParser pour analyser les requêtes JSON
app.use(bodyParser.json());

// Activation de CORS pour autoriser les requêtes cross-origin
app.use(cors());

// Connexion à MongoDB
const USER = process.env.USER_DB;
const PASSWORD = process.env.PASSWORD_DB;
const NAME = process.env.NAME_DB;
const uri = `mongodb+srv://${USER}:${PASSWORD}@${NAME}.pikrp.mongodb.net/`;

mongoose.connect(uri)
    .then(() => console.log('Connecté à MongoDB'))
    .catch(err => console.error('Erreur de connexion à MongoDB:', err));


const User = require('./models/User');
app.post('/reservations', (req, res) => {
    // logique de la réservation
});


// Route POST pour la réservation
app.post('/api/reservation', (req, res) => {
    const reservationData = req.body;

    // Créer une nouvelle instance de réservation avec les données reçues
    const newReservation = new Reservation(reservationData);

    // Sauvegarder la réservation dans la base de données
    newReservation.save()
        .then(() => {
            console.log("Réservation ajoutée avec succès");
            res.json({ message: 'Réservation réussie' });
        })
        .catch(err => {
            console.error('Erreur lors de l\'ajout de la réservation:', err);
            res.status(500).json({ error: 'Erreur interne lors de l\'ajout de la réservation' });
        });
});

// Route DELETE pour supprimer une réservation par ID
app.delete('/api/reservation/:id', (req, res) => {
    const { id } = req.params;

    // Trouver et supprimer la réservation par ID
    Reservation.findByIdAndDelete(id)
        .then((deletedReservation) => {
            if (!deletedReservation) {
                return res.status(404).json({ error: 'Réservation non trouvée' });
            }
            res.status(200).json({ message: 'Réservation supprimée avec succès' });
        })
        .catch(err => {
            console.error('Erreur lors de la suppression de la réservation:', err);
            res.status(500).json({ error: 'Erreur interne lors de la suppression de la réservation' });
        });
});

// Route PUT pour mettre à jour une réservation par ID
app.put('/api/reservation/:id', (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    // Trouver et mettre à jour la réservation par ID
    Reservation.findByIdAndUpdate(id, updatedData, { new: true })
        .then((updatedReservation) => {
            if (!updatedReservation) {
                return res.status(404).json({ error: 'Réservation non trouvée' });
            }
            res.status(200).json(updatedReservation);  // Retourne la réservation mise à jour
        })
        .catch(err => {
            console.error('Erreur lors de la mise à jour de la réservation:', err);
            res.status(500).json({ error: 'Erreur interne lors de la mise à jour de la réservation' });
        });
});

// Route GET pour récupérer toutes les réservations
app.get('/api/reservation', (req, res) => {
    Reservation.find()
        .then(reservations => {
            res.status(200).json(reservations);
        })
        .catch(err => {
            console.error('Erreur lors de la récupération des réservations:', err);
            res.status(500).json({ error: 'Erreur interne lors de la récupération des réservations' });
        });
});

// Route POST pour l'enregistrement des utilisateurs
app.post('/register', (req, res) => {
    const { lastname, firstname, email, password } = req.body;

    // Vérifier si l'email est déjà utilisé
    User.findOne({ email: email })
        .then(existingUser => {
            if (existingUser) {
                return res.status(400).json({ error: "Cet email est déjà utilisé." });
            }

            // Hacher le mot de passe avant de l'enregistrer
            bcrypt.hash(password, 10, (err, hashedPassword) => {
                if (err) {
                    return res.status(500).json({ error: 'Erreur lors du hachage du mot de passe' });
                }

                // Créer une nouvelle instance d'utilisateur avec le mot de passe haché
                const newUser = new User({
                    lastname,
                    firstname,
                    email,
                    password: hashedPassword
                });

                // Sauvegarder l'utilisateur dans la base de données
                newUser.save()
                    .then(() => {
                        console.log(`Utilisateur inscrit: ${firstname} ${lastname}, Email: ${email}`);
                        res.status(200).json({ message: 'Utilisateur créé avec succès' });
                    })
                    .catch(err => {
                        console.error('Erreur lors de l\'enregistrement de l\'utilisateur:', err);
                        res.status(500).json({ error: 'Erreur interne lors de l\'enregistrement de l\'utilisateur' });
                    });
            });
        })
        .catch(err => {
            console.error('Erreur lors de la recherche de l\'utilisateur:', err);
            res.status(500).json({ error: 'Erreur interne lors de la recherche de l\'utilisateur' });
        });
});

// Route POST pour la connexion des utilisateurs
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Chercher l'utilisateur par email
    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                // Si l'utilisateur n'existe pas
                return res.status(404).json({ error: 'Utilisateur non trouvé' });
            }

            // Comparer les mots de passe (ici avec bcrypt)
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {
                    return res.status(500).json({ error: 'Erreur interne lors de la vérification du mot de passe' });
                }

                if (!isMatch) {
                    return res.status(401).json({ error: 'Mot de passe incorrect' });
                }

                // Si le mot de passe est correct
                res.status(200).json({ message: 'Connexion réussie', user: { lastname: user.lastname, firstname: user.firstname, email: user.email } });
            });
        })
        .catch(err => {
            console.error('Erreur lors de la connexion de l\'utilisateur:', err);
            res.status(500).json({ error: 'Erreur interne lors de la connexion de l\'utilisateur' });
        });
});

// Utilisation des routes pour les utilisateurs et les réservations
app.use('/api/users', userRoutes);
app.use('/api/reservations', reservationRoutes);

// Création du serveur HTTP
const server = http.createServer(app);

// Lancement du serveur sur le port défini
server.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});