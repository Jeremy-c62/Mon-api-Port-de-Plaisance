const mongoose = require('mongoose');

// Définir le schéma du catway
const catwaySchema = new mongoose.Schema({
    catwayNumber: { type: Number, required: true, unique: true },
    catwayType: { type: String, required: true },
    catwayState: { type: String, required: true },
    description: { type: String, required: false }, // Ajoutez un champ description si nécessaire
});

// Créer le modèle à partir du schéma
const Catway = mongoose.model('Catway', catwaySchema);

// Exporter le modèle pour l'utiliser dans d'autres fichiers
module.exports = Catway;