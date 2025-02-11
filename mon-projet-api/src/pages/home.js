import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import Login from './connection/Login'; // Assurez-vous que ce chemin est correct
import Bacground from '../image/wharf-2741132_1280.jpg'; // Image de fond par défaut
import BacgroundAfterLogin from '../image/yachts-6298436_1280.jpg'; // Image de fond après connexion (remplacez par votre nouvelle image)

export default function Home() {
    const [showModal, setShowModal] = useState(false);
    const [connected, setConnected] = useState(false); // État pour vérifier si l'utilisateur est connecté

    // Fonction pour ouvrir le modal
    const handleShow = () => setShowModal(true);
    // Fonction pour fermer le modal
    const handleClose = () => setShowModal(false);

    // Fonction pour changer l'état de la connexion
    const handleLoginSuccess = () => {
        setConnected(true); // Lorsque l'utilisateur se connecte, on met à jour l'état de la connexion
        setShowModal(false); // Fermer le modal de connexion après succès
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
                    <h1>Bienvenue sur le sit du port de plaissance Russel</h1>
                    <p>Pour poursuivre votre navigation veuillez vous conecter.</p>

                    {/* Si l'utilisateur n'est pas connecté, afficher le bouton pour ouvrir le modal */}
                    {!connected && (
                        <Button variant="primary" onClick={handleShow}>
                            Se connecter
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