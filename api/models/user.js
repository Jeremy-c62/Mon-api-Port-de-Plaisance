const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
    id: { type: String, require: true, unique: true },
    lastname: { type: String, required: true },
    firstname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

// Appliquer le validateur unique à l'email
userSchema.plugin(uniqueValidator);

// Vérifier si le modèle existe déjà, sinon créer le modèle
const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;