const express = require('express');
const router = express.Router();
const User = require('../models/User');  // Assurez-vous que le modèle User est bien importé
const bcrypt = require('bcryptjs');

// Route POST pour l'enregistrement des utilisateurs
router.post('/register', (req, res) => {
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
router.post('/login', (req, res) => {
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

module.exports = router;