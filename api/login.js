const bcrypt = require('bcryptjs'); // Assurez-vous d'avoir bcryptjs installé

// Route pour la connexion de l'utilisateur
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    // Vérifier si l'utilisateur existe dans la base de données
    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: 'Utilisateur non trouvé' });
            }

            // Comparer le mot de passe avec le hash stocké dans la base de données
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {
                    return res.status(500).json({ error: 'Erreur interne lors de la vérification du mot de passe' });
                }

                if (!isMatch) {
                    return res.status(401).json({ error: 'Mot de passe incorrect' });
                }

                // Si tout est bon, répondre avec un message de succès
                res.status(200).json({ message: 'Connexion réussie', user: { lastname: user.lastname, firstname: user.firstname, email: user.email } });
            });
        })
        .catch(err => {
            console.error('Erreur lors de la connexion de l\'utilisateur:', err);
            res.status(500).json({ error: 'Erreur interne lors de la connexion' });
        });
});