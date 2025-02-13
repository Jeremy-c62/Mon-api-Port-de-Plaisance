import React from 'react';

const UserList = ({ users, onEdit, onDelete }) => {
    return (
        <div>
            <h2>Liste des Utilisateurs</h2>
            {users.length > 0 ? (
                <ul>
                    {users.map(user => (
                        <li key={user.email}>
                            {user.name} ({user.email})
                            <button onClick={() => onEdit(user)}>Éditer</button>
                            <button onClick={() => onDelete(user.email)}>Supprimer</button>
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