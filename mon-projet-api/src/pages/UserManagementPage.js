import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserList from '../components/UserList';
import AddUserForm from '../components/AddUserForm';
import EditUserForm from '../components/EditUserForm';
import Cataway from '../components/Catway';

const UserManagementPage = () => {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

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

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleEdit = (user) => {
        setEditingUser(user);
    };

    const handleUserAdded = async (user) => {
        try {
            const response = await axios.post('http://localhost:8080/api/users', user);
            if (response.status === 200 || response.status === 201) {
                fetchUsers();
            }
        } catch (error) {
            setError('Erreur lors de l\'ajout de l\'utilisateur');
        }
    };

    const handleUserUpdated = async (user) => {
        try {
            const response = await axios.put(`http://localhost:8080/api/users/${user._id}`, user);
            if (response.status === 200) {
                fetchUsers();
            }
        } catch (error) {
            setError('Erreur lors de la mise à jour de l\'utilisateur');
        }
    };

    return (
        <div className="container d-flex flex-column align-items-center mt-4">
            <h1 className="text-center mb-4">Gestion des Utilisateurs</h1>

            <div className="mb-4 w-75">
                {editingUser ? (
                    <EditUserForm user={editingUser} onUserUpdated={handleUserUpdated} />
                ) : (
                    <AddUserForm onUserAdded={handleUserAdded} />
                )}
            </div>

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

            {error && <p className="text-danger text-center">{error}</p>}

            <div className="mt-5 w-75">
                <Cataway /> {/* Le composant Cataway.js que nous avons créé */}
            </div>
        </div>
    );
};

export default UserManagementPage;