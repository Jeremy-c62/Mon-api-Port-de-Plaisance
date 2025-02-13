import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserList from '../components/UserList';
import AddUserForm from '../components/AddUserForm';
import EditUserForm from '../components/EditUserForm';

const UserManagementPage = () => {
    const [users, setUsers] = useState([]);  // State pour stocker la liste des utilisateurs
    const [editingUser, setEditingUser] = useState(null);
    const [error, setError] = useState('');

    // Méthode pour récupérer la liste des utilisateurs
    const fetchUsers = () => {
        axios.get('http://localhost:8080/api/users')  // Remplacez l'URL par celle de votre API
            .then(response => {
                setUsers(response.data);  // Mettre à jour la liste des utilisateurs
            })
            .catch(error => {
                setError('Erreur lors de la récupération des utilisateurs');
                console.error(error);
            });
    };

    // Appeler fetchUsers lors du premier rendu du composant
    useEffect(() => {
        fetchUsers();
    }, []);

    const handleEdit = (user) => {
        setEditingUser(user);
    };

    const handleDelete = (email) => {
        axios.delete(`http://localhost:8080/api/users/${email}`)  // Remplacez l'URL par celle de votre API
            .then(() => {
                alert('Utilisateur supprimé');
                fetchUsers();  // Actualiser la liste des utilisateurs après suppression
            })
            .catch(error => {
                console.error('Erreur lors de la suppression de l\'utilisateur', error);
            });
    };

    const handleUserAdded = () => {
        setEditingUser(null);
        fetchUsers();  // Actualiser la liste des utilisateurs après ajout
    };

    const handleUserUpdated = () => {
        setEditingUser(null);
        fetchUsers();  // Actualiser la liste des utilisateurs après modification
    };

    return (
        <div>
            <h1>Gestion des Utilisateurs</h1>

            {editingUser ? (
                <EditUserForm user={editingUser} onUserUpdated={handleUserUpdated} />
            ) : (
                <AddUserForm onUserAdded={handleUserAdded} />
            )}

            <UserList users={users} onEdit={handleEdit} onDelete={handleDelete} />
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default UserManagementPage;