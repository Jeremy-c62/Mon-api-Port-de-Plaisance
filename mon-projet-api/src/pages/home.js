import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Utilisation de useNavigate pour la navigation
import Login from './connection/Login'; // Assurez-vous que ce chemin est correct
import Bacground from '../image/wharf-2741132_1280.jpg'; // Image de fond par défaut
import BacgroundAfterLogin from '../image/yachts-6298436_1280.jpg'; // Image de fond après connexion (remplacez par votre nouvelle image)

export default function Home() {
    const [showModal, setShowModal] = useState(false);
    const [connected, setConnected] = useState(false); // État pour vérifier si l'utilisateur est connecté
    const navigate = useNavigate(); // Hook de navigation

    // Fonction pour ouvrir le modal
    const handleShow = () => setShowModal(true);

    // Fonction pour naviguer vers la page de réservation
    const handleReservation = () => {
        navigate('/reservation'); // Naviguer vers la page de réservation
    };

    // Fonction pour fermer le modal
    const handleClose = () => setShowModal(false);

    // Fonction pour changer l'état de la connexion
    const handleLoginSuccess = () => {
        setConnected(true); // Lorsque l'utilisateur se connecte, on met à jour l'état de la connexion
        setShowModal(false); // Fermer le modal de connexion après succès
    };

    // Fonction pour déconnecter l'utilisateur
    const handleLogout = () => {
        setConnected(false); // Réinitialiser l'état de la connexion
    };

    return (
        <div
            className="container-fluid p-0"
            style={{
                backgroundImage: `url(${connected ? BacgroundAfterLogin : Bacground})`, // Change l'image de fond selon l'état de connexion
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100vh', // Cela garantit que l'image couvre toute la hauteur de la fenêtre
            }}
        >
            <div className="d-flex justify-content-center align-items-center h-100 text-center text-white">
                <div>
                    <h1>Bienvenue sur le site du port de plaisance Russel</h1>
                    <p>Vous pouvez faire une réservation ou vous connecter pour accéder à plus de fonctionnalités.</p>

                    {/* Le bouton de réservation est maintenant toujours accessible */}
                    <Button variant="success" className="mt-3" onClick={handleReservation}>
                        Faire une réservation
                    </Button>

                    {/* Afficher les boutons de connexion ou de déconnexion en fonction de l'état */}
                    {!connected && (
                        <Button variant="primary" className="mt-3 ms-3" onClick={handleShow}>
                            Se connecter
                        </Button>
                    )}

                    {connected && (
                        <Button variant="danger" className="mt-3 ms-3" onClick={handleLogout}>
                            Se déconnecter
                        </Button>
                    )}
                </div>
            </div>

            {/* Modal (pop-up) pour la page de connexion */}
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Se connecter</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Login onLoginSuccess={handleLoginSuccess} />
                </Modal.Body>
            </Modal>
        </div>
    );
}