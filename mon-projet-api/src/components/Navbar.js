import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContext } from '../context/authContext'; // Importer le contexte d'authentification

export default function Navbar() {
    const { currentUser } = useContext(AuthContext); // Obtenir l'utilisateur actuel

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Port de plaisance Russel</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    {/* Ajouter la classe ms-auto pour aligner les liens à droite */}
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" to="/">Accueil</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Inscription</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Connexion</Link>
                        </li>
                        {/* Afficher le lien "Réservation" seulement si l'utilisateur est connecté */}
                        {currentUser && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/reservation">Réservation</Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}