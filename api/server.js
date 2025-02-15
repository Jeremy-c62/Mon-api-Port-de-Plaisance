const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');  // Pour le hachage des mots de passe
const userRoutes = require('./router/user');
const reservationRoutes = require('./router/reservation');
const Reservation = require('./models/reservation');
const Catway = require('./models/catway');
const catwayRoutes = require('./router/catway');
require('dotenv').config(); // Charger les variables d'environnement depuis .env


// Utilisation des routes pour les utilisateurs et les réservations
app.use('/api/users', userRoutes);
app.use('/api/reservation', reservationRoutes);

// Utilisation de bodyParser pour analyser les requêtes JSON
app.use(express.json());

// Activation de CORS pour autoriser les requêtes cross-origin
app.use(cors());

// Connexion à MongoDB
const USER = process.env.USER_DB;
const PASSWORD = process.env.PASSWORD_DB;
const NAME = process.env.NAME_DB;
const uri = `mongodb+srv://${USER}:${PASSWORD}@${NAME}.pikrp.mongodb.net/`;
const User = require('./models/User');

mongoose.connect(uri)
    .then(() => console.log('Connecté à MongoDB'))
    .catch(err => console.error('Erreur de connexion à MongoDB:', err));

app.get('/api/catways', (req, res) => {
    const { catwayType } = req.query;

    // Si le type est spécifié, filtrez les résultats, sinon retournez tous les catways
    if (catwayType) {
        Catway.find({ catwayType })  // Filtre par type
            .then((catways) => res.json(catways))
            .catch((err) => res.status(400).json('Error: ' + err));
    } else {
        // Retourne tous les catways si le type n'est pas spécifié
        Catway.find()
            .then((catways) => res.json(catways))
            .catch((err) => res.status(400).json('Error: ' + err));
    }
});


// Route POST pour la réservation
app.post('/api/reservation', async (req, res) => {
    const { boatName, clientName, catwayNumber, catwayType, startDate, endDate } = req.body;

    if (!boatName || !clientName || !catwayNumber || !catwayType || !startDate || !endDate) {
        return res.status(400).json({ message: 'Tous les champs sont requis' });
    }

    try {
        // Créer une nouvelle réservation
        const newReservation = new Reservation({
            boatName,
            clientName,
            catwayNumber,
            catwayType,
            startDate,
            endDate
        });

        await newReservation.save();
        res.status(201).json(newReservation);
    } catch (error) {
        console.error('Erreur lors de l\'ajout de la réservation:', error);
        res.status(500).json({ message: 'Erreur interne lors de l\'ajout de la réservation' });
    }
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

app.post('/register', async (req, res) => {
    const { lastname, firstname, email, password } = req.body;

    if (!password || typeof password !== 'string' || password.trim() === '') {
        return res.status(400).json({ error: 'Mot de passe invalide' });
    }

    try {
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ error: "Cet email est déjà utilisé." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            lastname,
            firstname,
            email,
            password: hashedPassword
        });

        await newUser.save();
        console.log(`Utilisateur inscrit: ${firstname} ${lastname}, Email: ${email}`);
        res.status(200).json({ message: 'Utilisateur créé avec succès' });
    } catch (err) {
        console.error('Erreur lors de l\'enregistrement de l\'utilisateur:', err);
        res.status(500).json({ error: 'Erreur interne lors de l\'enregistrement de l\'utilisateur' });
    }
});

app.post('/api/users', async (req, res) => {
    const { lastname, firstname, email, password } = req.body;

    console.log('Données reçues:', req.body);  // Pour déboguer

    // Vérifier que toutes les données sont présentes
    if (!firstname || !lastname || !email || !password) {
        return res.status(400).json({ message: 'Tous les champs sont requis' });
    }

    if (!password) {
        return res.status(400).json({ message: 'Le mot de passe est requis' });
    }

    try {
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ error: "Cet email est déjà utilisé." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Mot de passe haché:", hashedPassword);

        const newUser = new User({
            lastname,
            firstname,
            email,
            password: hashedPassword
        });

        await newUser.save();
        console.log(`Utilisateur inscrit: ${firstname} ${lastname}, Email: ${email}`);
        res.status(200).json({ message: 'Utilisateur créé avec succès' });
    } catch (err) {
        console.error('Erreur lors de l\'enregistrement de l\'utilisateur:', err);
        res.status(500).json({ error: 'Erreur interne lors de l\'enregistrement de l\'utilisateur' });
    }
});
//  POST pour la connexion des utilisateurs
const jwt = require('jsonwebtoken');

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Mot de passe incorrect' });
        }

        // Créer un token JWT
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '1h' } // Expire dans 1 heure
        );

        res.status(200).json({
            message: 'Connexion réussie',
            token,
            user: { lastname: user.lastname, firstname: user.firstname, email: user.email }
        });
    } catch (err) {
        console.error('Erreur lors de la connexion de l\'utilisateur:', err);
        res.status(500).json({ error: 'Erreur interne lors de la connexion de l\'utilisateur' });
    }
});

//  GET pour récupérer tous les utilisateurs
app.get('/api/users', (req, res) => {
    User.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            console.error('Erreur lors de la récupération des utilisateurs:', err);
            res.status(500).json({ error: 'Erreur interne lors de la récupération des utilisateurs' });
        });
});

//  GET pour récupérer un utilisateur par ID
app.get('/api/users/:id', (req, res) => {
    const { id } = req.params;

    User.findById(id)
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: 'Utilisateur non trouvé' });
            }
            res.status(200).json(user);
        })
        .catch(err => {
            console.error('Erreur lors de la récupération de l\'utilisateur:', err);
            res.status(500).json({ error: 'Erreur interne lors de la récupération de l\'utilisateur' });
        });
});

// PUT pour mettre à jour un utilisateur par ID
app.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    User.findByIdAndUpdate(id, updatedData, { new: true })
        .then(updatedUser => {
            if (!updatedUser) {
                return res.status(404).json({ error: 'Utilisateur non trouvé' });
            }
            res.status(200).json(updatedUser);
        })
        .catch(err => {
            console.error('Erreur lors de la mise à jour de l\'utilisateur:', err);
            res.status(500).json({ error: 'Erreur interne lors de la mise à jour de l\'utilisateur' });
        });
});

//DELETE pour supprimer un utilisateur par ID
app.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;

    User.findByIdAndDelete(id)
        .then(deletedUser => {
            if (!deletedUser) {
                return res.status(404).json({ error: 'Utilisateur non trouvé' });
            }
            res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
        })
        .catch(err => {
            console.error('Erreur lors de la suppression de l\'utilisateur:', err);
            res.status(500).json({ error: 'Erreur interne lors de la suppression de l\'utilisateur' });
        });
});
app.post('/api/catways', (req, res) => {
    const { catwayNumber, catwayType, catwayState } = req.body;
    if (!catwayNumber || !catwayType || !catwayState) {
        return res.status(400).json({ message: 'Le paramètre catwayType est requis' });
    }

});
app.use('/api/catways', catwayRoutes);
// Configuration du port
const port = process.env.PORT || 8080;
// Création du serveur HTTP
const server = http.createServer(app);

// Lancement du serveur sur le port défini
server.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});