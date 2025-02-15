const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Assure-toi que le chemin est correct

async function createUser() {
    try {
        // Connexion à MongoDB (Assure-toi que ton serveur est en cours d'exécution)
        await mongoose.connect('mongodb://localhost:27017/ton_database', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        const hashedPassword = await bcrypt.hash('Password123', 10);

        const newUser = new User({
            lastname: 'Doe',
            firstname: 'John',
            email: 'john.doe@example.com',
            password: hashedPassword,
        });

        await newUser.save();
        console.log('Utilisateur créé avec succès');
        mongoose.disconnect(); // Déconnexion après l'insertion

    } catch (err) {
        console.error('Erreur lors de la création de l\'utilisateur:', err);
    }
}

createUser();