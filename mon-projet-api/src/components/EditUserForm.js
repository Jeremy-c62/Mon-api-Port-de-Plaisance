// src/components/EditUserForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditUserForm = ({ user, onUserUpdated }) => {
    const [lastname, setLastname] = useState(user.lastname);
    const [firstname, setFirstname] = useState(user.firstname);
    const [email, setEmail] = useState(user.email);

    useEffect(() => {
        setLastname(user.lastname);
        setFirstname(user.firstname);
        setEmail(user.email);
    }, [user]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedUser = { lastname, firstname, email };

        axios.put(`http://localhost:5000/users/${email}`, updatedUser) // Remplacez par l'URL de votre API
            .then(response => {
                onUserUpdated();
            })
            .catch(error => {
                console.error('Erreur lors de la mise à jour de l\'utilisateur', error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Modifier un Utilisateur</h2>
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
                disabled
            />
            <button type="submit">Mettre à jour</button>
        </form>
    );
};

export default EditUserForm;