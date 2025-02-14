import React, { useState } from 'react';
import axios from 'axios';
import DeleteUserButton from './DeleteUserForm';

const UserList = ({ users, onEdit }) => {
    const [userList, setUserList] = useState(users);
    const [editingUser, setEditingUser] = useState(null);
    const [updatedFirstName, setUpdatedFirstName] = useState('');
    const [updatedLastName, setUpdatedLastName] = useState('');

    const handleDeleteSuccess = (deletedUserId) => {
        // Met à jour la liste des utilisateurs après suppression
        const updatedUsers = userList.filter(user => user._id !== deletedUserId);
        setUserList(updatedUsers);
        console.log(`Utilisateur avec l'ID ${deletedUserId} supprimé de la liste.`);
    };

    const handleEditClick = (user) => {
        // Initialisation du formulaire d'édition avec les valeurs actuelles
        setEditingUser(user);
        setUpdatedFirstName(user.firstname);
        setUpdatedLastName(user.lastname);
    };

    const handleUpdateUser = async (userId) => {
        try {
            // Mise à jour des informations utilisateur
            const response = await axios.put(`http://localhost:8080/api/users/${userId}`, {
                firstname: updatedFirstName,
                lastname: updatedLastName,
            });

            // Mise à jour de l'interface
            const updatedUsers = userList.map(user =>
                user._id === userId
                    ? { ...user, firstname: updatedFirstName, lastname: updatedLastName }
                    : user
            );
            setUserList(updatedUsers);
            setEditingUser(null); // Fermer le formulaire d'édition
            alert('Utilisateur modifié avec succès');
        } catch (error) {
            console.error('Erreur lors de la modification de l\'utilisateur:', error);
            alert('Erreur lors de la modification de l\'utilisateur.');
        }
    };

    return (
        <div>
            <h2>Liste des Utilisateurs</h2>
            {userList.length > 0 ? (
                <ul>
                    {userList.map((user) => (
                        <li key={user._id}>
                            {/* Affiche le prénom et nom */}
                            <span>
                                {user.firstname && user.lastname
                                    ? `${user.firstname} ${user.lastname}`
                                    : 'Nom ou prénom manquant'}
                            </span>
                            <button onClick={() => handleEditClick(user)}>Éditer</button>

                            {/* Suppression d'un utilisateur */}
                            <DeleteUserButton
                                userId={user._id}
                                onDeleteSuccess={() => handleDeleteSuccess(user._id)}
                            />
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Aucun utilisateur trouvé</p>
            )}

            {/* Formulaire d'édition */}
            {editingUser && (
                <div>
                    <h3>Modifier l'utilisateur</h3>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleUpdateUser(editingUser._id);
                        }}
                    >
                        <div>
                            <label>Prénom:</label>
                            <input
                                type="text"
                                value={updatedFirstName}
                                onChange={(e) => setUpdatedFirstName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label>Nom:</label>
                            <input
                                type="text"
                                value={updatedLastName}
                                onChange={(e) => setUpdatedLastName(e.target.value)}
                            />
                        </div>
                        <button type="submit">Mettre à jour</button>
                        <button onClick={() => setEditingUser(null)}>Annuler</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default UserList;