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
        <div>
            <h1>Gestion des Utilisateurs</h1>

            {editingUser ? (
                <EditUserForm
                    user={editingUser}
                    onUserUpdated={handleUserUpdated}
                />
            ) : (
                <AddUserForm onUserAdded={handleUserAdded} />
            )}

            {loading ? (
                <p>Chargement...</p>  // Afficher un message pendant le chargement
            ) : (
                <UserList users={users} onEdit={handleEdit}>
                    {users.map(user => (
                        <div key={user._id}>
                            <p>{user.name} ({user.email})</p>
                            <DeleteUserButton
                                userEmail={user.email}
                                onDeleteSuccess={handleDeleteSuccess}
                            />
                        </div>
                    ))}
                </UserList>
            )}

            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default UserManagementPage;