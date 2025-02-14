const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Fonction pour l'inscription d'un utilisateur
exports.register = (req, res) => {
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
                        res.status(201).json({ message: 'Utilisateur créé avec succès' });
                    })
                    .catch(err => {
                        res.status(500).json({ error: 'Erreur lors de l\'enregistrement de l\'utilisateur' });
                    });
            });
        })
        .catch(err => {
            res.status(500).json({ error: 'Erreur lors de la recherche de l\'utilisateur' });
        });
};

// Fonction pour la connexion d'un utilisateur
exports.login = (req, res) => {
    const { email, password } = req.body;

    // Chercher l'utilisateur par email
    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: 'Utilisateur non trouvé' });
            }

            // Comparer les mots de passe
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {
                    return res.status(500).json({ error: 'Erreur lors de la vérification du mot de passe' });
                }

                if (!isMatch) {
                    return res.status(401).json({ error: 'Mot de passe incorrect' });
                }

                // Générer un token JWT pour la session
                const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

                res.status(200).json({ message: 'Connexion réussie', token });
            });
        })
        .catch(err => {
            res.status(500).json({ error: 'Erreur lors de la connexion de l\'utilisateur' });
        });
};

// Fonction pour récupérer tous les utilisateurs
exports.getAllUsers = (req, res) => {
    User.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
        });
};

// Fonction pour récupérer un utilisateur par ID
exports.getUserById = (req, res) => {
    const { id } = req.params;

    User.findById(id)
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: 'Utilisateur non trouvé' });
            }
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(500).json({ error: 'Erreur lors de la récupération de l\'utilisateur' });
        });
};

// Fonction pour mettre à jour un utilisateur
exports.updateUser = (req, res) => {
    const { id } = req.params;
    const { firstname, lastname, email, password } = req.body;

    User.findById(id)
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: 'Utilisateur non trouvé' });
            }

            if (password) {
                bcrypt.hash(password, 10, (err, hashedPassword) => {
                    if (err) {
                        return res.status(500).json({ error: 'Erreur lors du hachage du mot de passe' });
                    }

                    user.firstname = firstname || user.firstname;
                    user.lastname = lastname || user.lastname;
                    user.email = email || user.email;
                    user.password = hashedPassword;

                    user.save()
                        .then(() => res.status(200).json({ message: 'Utilisateur mis à jour avec succès' }))
                        .catch(err => res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'utilisateur' }));
                });
            } else {
                user.firstname = firstname || user.firstname;
                user.lastname = lastname || user.lastname;
                user.email = email || user.email;

                user.save()
                    .then(() => res.status(200).json({ message: 'Utilisateur mis à jour avec succès' }))
                    .catch(err => res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'utilisateur' }));
            }
        })
        .catch(err => res.status(500).json({ error: 'Erreur lors de la récupération de l\'utilisateur' }));
};

// Fonction pour supprimer un utilisateur par ID
exports.deleteUserById = (req, res) => {
    const userId = req.params.id;

    User.findByIdAndDelete(userId)
        .then(result => {
            if (result) {
                return res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
            } else {
                return res.status(404).json({ error: 'Utilisateur non trouvé' });
            }
        })
        .catch(error => {
            return res.status(500).json({ error: 'Erreur du serveur' });
        });
};

// Fonction pour la page d'accueil (protégée par auth)
exports.home = (req, res) => {
    res.status(200).json({ message: 'Bienvenue sur la page d\'accueil' });
};