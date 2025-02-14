import React from 'react';
import DeleteUserButton from './DeleteUserForm';

const UserList = ({ users, onEdit, onDeleteSuccess }) => {
    return (
        <div>
            <h2>Liste des Utilisateurs</h2>
            {users.length > 0 ? (
                <ul>
                    {users.map((user) => (
                        <li key={user._id}> {/* Utilisation de _id pour la clé */}
                            <span>{user.name} ({user.email})</span>
                            <button onClick={() => onEdit(user)}>Éditer</button>

                            {/* Suppression d'un utilisateur */}
                            <DeleteUserButton
                                userId={user._id}
                                onDeleteSuccess={onDeleteSuccess}
                            />
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Aucun utilisateur trouvé</p>
            )}
        </div>
    );
};

export default UserList;