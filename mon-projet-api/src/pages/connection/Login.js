import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function Login({ onLoginSuccess }) {
    const [toggle, setToggle] = useState(false);

    // Fonction pour basculer la visibilité du mot de passe
    const showPassword = (e) => {
        e.preventDefault();
        setToggle(!toggle);
    };

    const initialValues = {
        email: "",
        password: ""
    };

    const [formValues, setFormValues] = useState(initialValues);

    const handleChange = e => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simuler une connexion réussie et appeler la fonction `onLoginSuccess`
        onLoginSuccess();
    };

    return (
        <form onSubmit={handleSubmit} className="w-50 mx-auto">
            <h1 className="mb-4">Se connecter</h1>

            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="Entrez votre email"
                    value={formValues.email}
                    onChange={handleChange}
                />
            </div>

            <div className="mb-3 position-relative">
                <label htmlFor="password" className="form-label">Mot de passe</label>
                <div className="input-group">
                    <input
                        type={toggle ? "text" : "password"}
                        className="form-control"
                        id="password"
                        name="password"
                        placeholder="Entrez votre mot de passe"
                        value={formValues.password}
                        onChange={handleChange}
                    />
                    <button className="btn btn-outline-secondary" onClick={showPassword} type="button">
                        {toggle ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </button>
                </div>
            </div>

            <button type="submit" className="btn btn-primary w-100">Se connecter</button>

            <h2 className="mt-4 text-center">
                Vous n'avez pas de compte ? <a href="/register">Créez un compte</a>
            </h2>
        </form>
    );
}