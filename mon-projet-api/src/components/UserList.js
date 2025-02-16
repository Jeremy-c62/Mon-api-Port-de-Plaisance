import React, { useState } from 'react';
import axios from 'axios';
import DeleteUserButton from './DeleteUserForm';

const UserList = ({ users, onEdit }) => {
    const [userList, setUserList] = useState(users);
    const [editingUser, setEditingUser] = useState(null);
    const [updatedFirstName, setUpdatedFirstName] = useState('');
    const [updatedLastName, setUpdatedLastName] = useState('');
    const [updatedEmail, setUpdatedEmail] = useState(''); // Etat pour l'email
    const [showModal, setShowModal] = useState(false); // État pour gérer l'affichage de la modale

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
        setUpdatedEmail(user.email); // Initialisation de l'email
        setShowModal(true); // Afficher la modale
    };

    const handleUpdateUser = async (userId) => {
        if (!updatedFirstName || !updatedLastName || !updatedEmail) {
            // Validation pour s'assurer que les champs ne sont pas vides
            alert('Le prénom, le nom et l\'email sont requis.');
            return;
        }

        try {
            // Mise à jour des informations utilisateur
            await axios.put(`http://localhost:8080/api/users/${userId}`, {
                firstname: updatedFirstName,
                lastname: updatedLastName,
                email: updatedEmail, // Ajout de l'email
            });

            // Mise à jour de l'interface
            const updatedUsers = userList.map(user =>
                user._id === userId
                    ? { ...user, firstname: updatedFirstName, lastname: updatedLastName, email: updatedEmail }
                    : user
            );
            setUserList(updatedUsers);
            setShowModal(false); // Fermer la modale
            alert('Utilisateur modifié avec succès');
        } catch (error) {
            console.error('Erreur lors de la modification de l\'utilisateur:', error);
            alert('Erreur lors de la modification de l\'utilisateur.');
        }
    };

    const handleCancelEdit = () => {
        // Annuler l'édition et remettre les anciennes valeurs
        setShowModal(false); // Fermer la modale
        setUpdatedFirstName('');
        setUpdatedLastName('');
        setUpdatedEmail('');
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Liste des Utilisateurs</h2>

            {/* Affichage des utilisateurs */}
            {userList.length > 0 ? (
                <table className="table table-sm table-bordered text-center">
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Prénom</th>
                            <th>Email</th>
                            <th className="w-25">Actions</th> {/* Réduction de la taille de la colonne "Actions" */}
                        </tr>
                    </thead>
                    <tbody>
                        {userList.map((user, index) => (
                            <tr key={user._id} className={index % 2 === 0 ? 'table-light' : 'table-secondary'}>
                                <td>{user.firstname}</td>
                                <td>{user.lastname}</td>
                                <td>{user.email}</td>
                                <td className="d-flex justify-content-end">
                                    <button className="btn btn-warning btn-sm me-2 rounded" onClick={() => handleEditClick(user)}>Modifier</button>
                                    <DeleteUserButton userId={user._id} onDeleteSuccess={() => handleDeleteSuccess(user._id)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-center">Aucun utilisateur trouvé</p>
            )}

            {/* Formulaire d'édition en modal */}
            {showModal && editingUser && (
                <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-labelledby="editUserModal" aria-hidden="true">
                    <div className="modal-dialog modal-lg d-flex justify-content-center align-items-center" role="document">
                        <div className="modal-content">
                            <div className="modal-header bg-light">
                                <h5 className="modal-title text-center w-100">Modifier l'utilisateur</h5>
                                <button type="button" className="btn-close" onClick={handleCancelEdit} aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        handleUpdateUser(editingUser._id);
                                    }}
                                >
                                    <div className="mb-3">
                                        <label className="form-label text-center w-100">Prénom:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={updatedFirstName}
                                            onChange={(e) => setUpdatedFirstName(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label text-center w-100">Nom:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={updatedLastName}
                                            onChange={(e) => setUpdatedLastName(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label text-center w-100">Email:</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            value={updatedEmail}
                                            onChange={(e) => setUpdatedEmail(e.target.value)}
                                            readOnly
                                        />
                                    </div>
                                    <div className="d-flex justify-content-end">
                                        <button type="submit" className="btn btn-success rounded me-2">
                                            Mettre à jour
                                        </button>
                                        <button type="button" className="btn btn-secondary rounded" onClick={handleCancelEdit}>
                                            Annuler
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserList;