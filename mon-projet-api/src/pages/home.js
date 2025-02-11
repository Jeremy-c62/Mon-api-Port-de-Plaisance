import React, { useState, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Importer useNavigate pour la navigation
import Login from './connection/Login';
import Bacground from '../image/wharf-2741132_1280.jpg';
import BacgroundAfterLogin from '../image/yachts-6298436_1280.jpg';
import LogoutIcon from '@mui/icons-material/Logout';
import { AuthContext } from '../context/authContext';

export default function Home() {
    const { currentUser, logout } = useContext(AuthContext); // Récupérer l'utilisateur actuel
    const [showModal, setShowModal] = useState(false); // Modal pour la connexion
    const navigate = useNavigate(); // Utiliser le hook useNavigate pour la navigation

    // Fonction pour ouvrir le modal
    const handleShow = () => setShowModal(true);

    // Fonction pour fermer le modal
    const handleClose = () => setShowModal(false);

    // Fonction après une connexion réussie
    const handleLoginSuccess = () => {
        setShowModal(false);
    };

    // Fonction de déconnexion
    const handleLogout = () => {
        localStorage.removeItem('User'); // Supprimer les données du localStorage

        logout(); // Appeler la fonction de déconnexion du contexte
        navigate('/'); // Rediriger vers la page d'accueil non sécurisée
    };

    // Fonction pour naviguer vers la page de réservation
    const handleReservation = () => {
        navigate('/reservation'); // Naviguer vers la page de réservation
    };

    return (
        <div
            className="container-fluid p-0"
            style={{
                backgroundImage: `url(${currentUser ? BacgroundAfterLogin : Bacground})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100vh',
            }}
        >
            <div className="d-flex justify-content-center align-items-center h-100 text-center text-white">
                <div>
                    <h1>Bienvenue {currentUser ? `${currentUser.firstname} ${currentUser.lastname}` : 'sur le site du port de plaisance Russel'}</h1>
                    <p>{currentUser ? 'Vous êtes connecté !' : 'Pour poursuivre votre navigation, veuillez vous connecter.'}</p>

                    {!currentUser ? (
                        <Button variant="primary" onClick={handleShow}>
                            Se connecter
                        </Button>
                    ) : (
                        // Centrer les deux boutons en colonne
                        <div className="d-flex flex-column justify-content-center align-items-center gap-3">
                            <Button variant="success" onClick={handleReservation}>
                                Faire une réservation
                            </Button>
                            <Button variant="danger" onClick={handleLogout} startIcon={<LogoutIcon />}>
                                Se déconnecter
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal de connexion */}
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Connexion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Login onLoginSuccess={handleLoginSuccess} />
                </Modal.Body>
            </Modal>
        </div>
    );
}