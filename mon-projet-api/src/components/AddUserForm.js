import React, { useState } from 'react';
import axios from 'axios';

const AddUserForm = ({ onUserAdded }) => {
    const [lastname, setLastname] = useState('');
    const [firstname, setFirstname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation de l'email
        if (!email.includes('@')) {
            setErrorMessage('L\'email doit être valide.');
            return;
        }

        // Validation du mot de passe (exemple simple)
        if (password.length < 10) {
            setErrorMessage('Le mot de passe doit comporter au moins 10 caractères.');
            return;
        }

        const newUser = { lastname, firstname, email, password };

        axios.post('http://localhost:8080/api/users', newUser)
            .then(response => {
                console.log(response);  // Ajoute cette ligne pour vérifier la réponse
                onUserAdded();  // Callback pour indiquer que l'utilisateur a été ajouté
                setLastname('');
                setFirstname('');
                setEmail('');
                setPassword('');
                setErrorMessage('');
            })
            .catch(error => {
                console.error('Erreur lors de l\'ajout de l\'utilisateur', error);
                setErrorMessage('Une erreur est survenue lors de l\'ajout de l\'utilisateur.');
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Ajouter un Utilisateur</h2>

            {/* Affichage du message d'erreur */}
            {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}

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