import React, { useState, useContext, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import Bacground from '../image/wharf-2741132_1280.jpg'; // Importation de l'image

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
        console.log("Données envoyées : ", formValues);

        try {
            // Tenter de se connecter avec les valeurs du formulaire
            const response = await login(formValues);

            if (response && response.token) {
                localStorage.setItem('token', response.token); // Stocker le token dans localStorage
            }


            // Si la connexion réussie, appelle onLoginSuccess
            if (onLoginSuccess) {
                onLoginSuccess();
            }
        } catch (error) {
            console.error("Erreur de connexion", error);
            // Gérer les erreurs spécifiques en fonction du backend
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data.error || "Erreur inconnue");
            } else {
                setErrorMessage("Une erreur est survenue.");
            }
        }
    };

    const navigate = useNavigate();

    useEffect(() => {
        if (successfullyLogin) {
            navigate('/home'); // Redirige vers la page d'accueil après connexion
        }
    }, [successfullyLogin, navigate]);

    return (
        <div style={{
            backgroundImage: `url(${Bacground})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <form
                onSubmit={handleLogin}
                className="w-50 p-4 rounded shadow"
                style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Transparent white background
                    transition: 'background-color 0.3s ease', // Transition pour l'effet de survol
                    opacity: 0.9, // Légère transparence par défaut
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'white'} // Change en blanc au survol
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'} // Retourne à la transparence
            >
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
                        style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.1)', // Transparence pour l'input
                            transition: 'background-color 0.3s ease', // Transition sur survol
                            opacity: 0.9, // Légère transparence par défaut
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'white'} // Changement de couleur au survol
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'} // Retour à la transparence
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
                            style={{
                                backgroundColor: 'rgba(255, 255, 255, 0.1)', // Transparence pour l'input
                                transition: 'background-color 0.3s ease', // Transition sur survol
                                opacity: 0.9, // Légère transparence par défaut
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'white'} // Changement de couleur au survol
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'} // Retour à la transparence
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

                {/* Ajout de la transparence sur le bouton */}
                <button
                    type="submit"
                    className="btn btn-primary w-100"
                    onClick={handleLogin}
                    style={{
                        backgroundColor: 'rgba(0, 123, 255, 0.1)', // Légère transparence sur le fond du bouton
                        transition: 'background-color 0.3s ease', // Transition au survol
                        opacity: 0.9, // Légère transparence par défaut
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 123, 255, 1)'} // Le bouton devient opaque au survol
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 123, 255, 0.7)'} // Retour à la transparence
                >
                    Se connecter
                </button>

                <h5 className="mt-4 text-center">
                    Vous n'avez pas de compte ? <a href="/register">Créez un compte</a>
                </h5>
            </form>
        </div>
    );
}