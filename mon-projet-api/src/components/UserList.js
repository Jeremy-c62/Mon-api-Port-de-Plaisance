import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = ({ onEdit, onDelete }) => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);  // Ajouter un état pour les erreurs

    useEffect(() => {
        // Effectuer la requête GET pour récupérer les utilisateurs
        axios.get('http://localhost:8080/api/users')  // URL corrigée
            .then(response => {
                // Mettre à jour les utilisateurs dans l'état
                setUsers(response.data);  // Supposons que la réponse est un tableau d'utilisateurs
            })
            .catch(error => {
                // Gérer les erreurs, par exemple afficher un message
                console.error('Erreur lors de la récupération des utilisateurs:', error);
                setError('Impossible de récupérer les utilisateurs.');
            });
    }, []);  // Le tableau vide [] signifie que cela se produira une seule fois lors du montage du composant

    return (
        <div>
            <h2>Liste des Utilisateurs</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}  {/* Afficher un message d'erreur si nécessaire */}
            <ul>
                {users.length === 0 ? (  // Si aucune donnée n'est disponible
                    <p>Aucun utilisateur trouvé.</p>
                ) : (
                    users.map(user => (
                        <li key={user._id}>
                            {user.firstname} {user.lastname} ({user.email})
                            <button onClick={() => onEdit(user)}>Modifier</button>
                            <button onClick={() => onDelete(user.email)}>Supprimer</button>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default UserList;