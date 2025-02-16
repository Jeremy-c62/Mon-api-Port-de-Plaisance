import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Bacground from '../image/yachts-6298436_1280.jpg'; // Image de fond

export default function Home() {
    const [connected, setConnected] = useState(false); // État de la connexion
    const navigate = useNavigate(); // Hook de navigation

    // Vérification de la connexion au chargement du composant
    useEffect(() => {
        const token = localStorage.getItem('token'); // Vérifie si un token existe dans le localStorage
        if (token) {
            setConnected(true); // Si un token est présent, cela signifie que l'utilisateur est connecté
        }
    }, []);

    // Fonction pour naviguer vers la page de réservation
    const handleReservation = () => {
        navigate('/reservation');
    };

    // Fonction pour déconnecter l'utilisateur
    const handleLogout = () => {
        localStorage.removeItem('token'); // Supprimer le token de localStorage
        setConnected(false); // Réinitialiser l'état de la connexion
        navigate('/'); // Rediriger vers la page d'accueil après déconnexion
        window.location.reload();
    };



    return (
        <div
            className="container-fluid p-0"
            style={{
                backgroundImage: `url(${Bacground})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100vh',
            }}
        >
            <div className="d-flex justify-content-center align-items-center h-100 text-center text-white">
                <div>
                    <h1>Bienvenue sur le site du port de plaisance Russel</h1>
                    <p>Vous pouvez faire une réservation ou vous déconnecter si vous êtes connecté.</p>

                    <Button variant="success" className="mt-3" onClick={handleReservation}>
                        Faire une réservation
                    </Button>

                    {/* Afficher uniquement le bouton "Se déconnecter" si l'utilisateur est connecté */}
                    {connected && (
                        <Button variant="danger" className="mt-3 ms-3" onClick={handleLogout}>
                            Se déconnecter
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}