const catways = [
    { catwayNumber: 1, catwayType: 'short', catwayState: 'bon état' },
    { catwayNumber: 2, catwayType: 'long', catwayState: 'en cours de réparation' },
    // Liste des catways...
];

// Récupérer tous les catways
exports.getAllCatways = () => {
    return catways;
};

// Récupérer un catway par son ID
exports.getCatwayById = (id) => {
    return catways.find(catway => catway.catwayNumber === id);
};

// Créer un catway avec vérification de l'unicité du `catwayNumber`
exports.createCatway = (catwayNumber, description, type) => {
    // Vérifier si un catway avec ce numéro existe déjà
    const existingCatway = catways.find(catway => catway.catwayNumber === catwayNumber);
    if (existingCatway) {
        throw new Error('Un catway avec ce numéro existe déjà.');
    }

    // Créer le nouveau catway
    const newCatway = { catwayNumber, description, type, catwayState: 'bon état' };
    catways.push(newCatway);
    return newCatway;
};

// Mettre à jour un catway
exports.updateCatway = (id, description, type) => {
    const catway = catways.find(catway => catway.catwayNumber === id);
    if (catway) {
        catway.description = description;
        catway.type = type;
        return catway;
    }
    return null;
};

// Supprimer un catway
exports.deleteCatway = (id) => {
    const index = catways.findIndex(catway => catway.catwayNumber === id);
    if (index !== -1) {
        return catways.splice(index, 1);
    }
    return null;
};