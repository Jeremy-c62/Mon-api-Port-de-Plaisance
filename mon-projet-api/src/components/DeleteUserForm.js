import React from 'react';
import axios from 'axios';

const DeleteUserButton = ({ userId, onDeleteSuccess }) => {
    const handleDelete = async () => {
        try {
            // Vérification de la validité de l'ID
            if (!userId || typeof userId !== 'string' || userId.trim() === '') {
                console.error('ID utilisateur invalide');
                alert('L\'ID fourni est invalide.');
                return;
            }

            console.log('Suppression de l\'utilisateur avec ID:', userId);

            // Envoi de la requête DELETE à l'API avec l'ID
            const response = await axios.delete(`http://localhost:8080/api/users/${userId}`);

            if (response.data && response.data.message) {
                console.log(response.data.message);
                alert('Utilisateur supprimé avec succès');

                // Vérifie si onDeleteSuccess est défini et est une fonction
                if (typeof onDeleteSuccess === 'function') {
                    onDeleteSuccess(); // Appel de la fonction
                } else {
                    console.warn('onDeleteSuccess n\'est pas défini ou n\'est pas une fonction');
                }
            } else {
                console.error('Réponse inattendue de l\'API');
                alert('Une erreur est survenue lors de la suppression de l\'utilisateur.');
            }
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'utilisateur:', error.response?.data?.error || error.message);
            alert('Erreur lors de la suppression de l\'utilisateur. Veuillez réessayer.');
        }
    };

    return (
        <button onClick={handleDelete} className="delete-button">
            Supprimer
        </button>
    );
};

export default DeleteUserButton;