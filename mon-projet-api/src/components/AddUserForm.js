import React, { useState } from 'react';
import axios from 'axios';

const AddUserForm = ({ onUserAdded }) => {
    const [lastname, setLastname] = useState('');
    const [firstname, setFirstname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const newUser = { lastname, firstname, email, password };

        axios.post(`http://localhost:8080/api/users/${email}`, newUser)  // Remplacez par l'URL de votre API
            .then(response => {
                onUserAdded();
                setLastname('');
                setFirstname('');
                setEmail('');
                setPassword('');
            })
            .catch(error => {
                console.error('Erreur lors de l\'ajout de l\'utilisateur', error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Ajouter un Utilisateur</h2>
            <input
                type="text"
                placeholder="Nom"
                value={lastname}
                onChange={e => setLastname(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Prénom"
                value={firstname}
                onChange={e => setFirstname(e.target.value)}
                required
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
            />
            <button type="submit">Ajouter</button>
        </form>
    );
};

export default AddUserForm;