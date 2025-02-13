// src/pages/UserManagementPage.js
import React, { useState } from 'react';
import axios from 'axios';
import UserList from '../components/UserList';
import AddUserForm from '../components/AddUserForm';
import EditUserForm from '../components/EditUserForm';

const UserManagementPage = () => {
    const [editingUser, setEditingUser] = useState(null);

    const handleEdit = (user) => {
        setEditingUser(user);
    };

    const handleDelete = (email) => {
        axios.delete(`http://localhost:8080/users/${email}`)  // Remplacez l'URL par celle de votre API
            .then(() => {
                alert('Utilisateur supprimé');
            })
            .catch(error => {
                console.error('Erreur lors de la suppression de l\'utilisateur', error);
            });
    };

    const handleUserAdded = () => {
        setEditingUser(null);
    };

    const handleUserUpdated = () => {
        setEditingUser(null);
    };

    return (
        <div>
            <h1>Gestion des Utilisateurs</h1>

            {editingUser ? (
                <EditUserForm user={editingUser} onUserUpdated={handleUserUpdated} />
            ) : (
                <AddUserForm onUserAdded={handleUserAdded} />
            )}

            <UserList onEdit={handleEdit} onDelete={handleDelete} />
        </div>
    );
};

export default UserManagementPage;