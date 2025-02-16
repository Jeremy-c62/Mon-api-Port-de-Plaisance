import axios from 'axios';

// Fonction pour accéder aux données protégées
const getProtectedData = async () => {
    const token = localStorage.getItem('token'); // Récupérer le token depuis le localStorage

    if (!token) {
        console.error("Aucun token trouvé. L'utilisateur n'est pas authentifié.");
        return;
    }

    try {
        const response = await axios.get('http://localhost:8080/api/protected-route', {
            headers: {
                Authorization: `Bearer ${token}` // Ajouter le token dans l'en-tête
            }
        });
        console.log(response.data); // Traiter la réponse
        return response.data; // Optionnel, retourne la réponse si nécessaire
    } catch (error) {
        console.error("Erreur lors de l'accès à la route protégée:", error);
    }
};

// Exporter la fonction pour l'utiliser dans d'autres parties de l'application
export default getProtectedData;