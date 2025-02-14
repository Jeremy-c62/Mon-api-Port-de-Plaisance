import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserList from '../components/UserList';
import AddUserForm from '../components/AddUserForm';
import EditUserForm from '../components/EditUserForm';
import DeleteUserButton from '../components/DeleteUserForm';

const UserManagementPage = () => {
    const [users, setUsers] = useState([]);  // State pour stocker la liste des utilisateurs
    const [editingUser, setEditingUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);  // Ajout de l'état pour gérer le chargement

    // Méthode pour récupérer la liste des utilisateurs
    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:8080/api/users');
            setUsers(response.data);
        } catch (error) {
            setError('Erreur lors de la récupération des utilisateurs');
        } finally {
            setLoading(false);
        }
    };

    // Appeler fetchUsers lors du premier rendu du composant
    useEffect(() => {
        fetchUsers();
    }, []);

    const handleEdit = (user) => {
        setEditingUser(user);
    };

    const handleUserAdded = async (user) => {
        try {
            await axios.post('http://localhost:8080/api/user/', user);
            fetchUsers();  // Actualiser la liste des utilisateurs après ajout
        } catch (error) {
            setError('Erreur lors de l\'ajout de l\'utilisateur');
        }
    };

    const handleUserUpdated = async (user) => {
        try {
            await axios.put(`http://localhost:8080/api/user/${user._id}`, user);
            fetchUsers();  // Actualiser la liste des utilisateurs après modification
        } catch (error) {
            setError('Erreur lors de la mise à jour de l\'utilisateur');
        }
    };

    const handleDeleteSuccess = async (email) => {
        try {
            await axios.delete(`http://localhost:8080/api/user/${email}`);
            fetchUsers();  // Rafraîchir la liste des utilisateurs après suppression
        } catch (error) {
            setError('Erreur lors de la suppression de l\'utilisateur');
        }
    };

    return (
        <div className="container d-flex flex-column align-items-center mt-4">
            <h1 className="text-center mb-4">Gestion des Utilisateurs</h1>

            {/* Formulaire d'ajout ou d'édition */}
            <div className="mb-4 w-75">
                {editingUser ? (
                    <EditUserForm
                        user={editingUser}
                        onUserUpdated={handleUserUpdated}
                    />
                ) : (
                    <AddUserForm onUserAdded={handleUserAdded} />
                )}
            </div>

            {/* Affichage de la liste des utilisateurs */}
            {loading ? (
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Chargement...</span>
                    </div>
                </div>
            ) : (
                <div className="list-group w-75">
                    <UserList users={users} onEdit={handleEdit} />
                </div>
            )}

            {/* Affichage des erreurs */}
            {error && <p className="text-danger text-center">{error}</p>}
        </div>
    );
};

export default UserManagementPage;