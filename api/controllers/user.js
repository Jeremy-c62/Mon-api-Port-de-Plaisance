const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const KEY = process.env.SECRET_KEY;

// Fonction pour l'enregistrement d'un utilisateur
exports.register = (req, res) => {
    const { lastname, firstname, email, password } = req.body;

    // Hachage du mot de passe avant de l'enregistrer
    bcrypt.hash(password, 10)
        .then(hash => {
            const user = new User({
                lastname,
                firstname,
                email,
                password: hash
            });
            // Sauvegarde du nouvel utilisateur
            user.save()
                .then(() => res.status(201).json({ message: "Utilisateur enregistré avec succès" }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

// Fonction pour la connexion de l'utilisateur
exports.login = (req, res) => {
    const { email, password } = req.body;

    // Recherche de l'utilisateur par email
    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: "Email ou mot de passe incorrect" });
            }

            // Comparaison du mot de passe avec celui en base de données
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (!isMatch) {
                        return res.status(401).json({ message: "Email ou mot de passe incorrect" });
                    }

                    // Si tout est correct, création du token JWT
                    const token = jwt.sign(
                        { userId: user._id },
                        KEY, // Utilisation de la clé secrète depuis l'environnement
                        { expiresIn: '24h' }
                    );

                    return res.status(200).json({
                        userId: user._id,
                        lastname: user.lastname,
                        firstname: user.firstname,
                        token: token // Retourne le token JWT
                    });
                })
                .catch(error => res.status(500).json({ error: "Erreur lors de la comparaison du mot de passe", details: error }));
        })
        .catch(error => res.status(500).json({ error: "Erreur lors de la recherche de l'utilisateur", details: error }));
};

// Fonction pour l'accès à la page d'accueil
exports.home = (req, res) => {
    res.status(200).json({ message: 'Bienvenue sur la page d\'accueil' });
};