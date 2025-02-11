import React, { useState, useContext, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

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
    const [errorMessage, setErrorMessage] = useState(""); // Pour afficher un message d'erreur personnalisé

    // Récupération des données du contexte d'authentification
    const { formError, login, successfullyLogin } = useContext(AuthContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            // Tenter de se connecter avec les valeurs du formulaire
            await login(formValues);

            // Si la connexion réussie, appelle onLoginSuccess
            if (onLoginSuccess) {
                onLoginSuccess();
            }
        } catch (error) {
            console.error("Erreur de connexion", error);
            setErrorMessage("Email ou mot de passe incorrect.");
        }
    };

    const navigate = useNavigate();

    useEffect(() => {
        if (successfullyLogin) {
            navigate('/'); // Redirige vers la page d'accueil après connexion
        }
    }, [successfullyLogin, navigate]);

    return (
        <form onSubmit={handleLogin} className="w-50 mx-auto">
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

            {/* Affichage des erreurs */}
            {(formError || errorMessage) && (
                <p className="text-danger">{formError || errorMessage}</p>
            )}

            <button type="submit" className="btn btn-primary w-100" onClick={handleLogin}>Se connecter</button>

            <h2 className="mt-4 text-center">
                Vous n'avez pas de compte ? <a href="/register">Créez un compte</a>
            </h2>
        </form>
    );
}