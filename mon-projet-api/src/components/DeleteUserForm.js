import React from 'react';
import axios from 'axios';

const DeleteUserButton = ({ userEmail, onDeleteSuccess }) => {
    const handleDelete = async () => {
        try {
            if (!userEmail) {
                console.error('Email utilisateur invalide');
                return;
            }

            console.log('Suppression de l\'utilisateur avec Email:', userEmail); // Vérification de l'Email

            // Envoi de la requête DELETE à l'API avec l'email
            const response = await axios.delete(`http://localhost:8080/api/users/email/${userEmail}`);

            // Vérifier si la réponse contient un message
            if (response.data && response.data.message) {
                console.log(response.data.message);  // Affiche le message de succès
                onDeleteSuccess();  // Appel de la fonction de succès pour notifier le parent que l'utilisateur a été supprimé
            } else {
                console.error('Réponse inattendue de l\'API');
            }
        } catch (error) {
            // Améliorer le message d'erreur pour l'utilisateur
            console.error('Erreur lors de la suppression de l\'utilisateur:', error.response?.data?.error || error.message);
        }
    };

    return (
        <button onClick={handleDelete} className="delete-button">
            Supprimer
        </button>
    );
};

export default DeleteUserButton;