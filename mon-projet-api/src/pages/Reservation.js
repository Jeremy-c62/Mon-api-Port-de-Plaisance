import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';

export default function Reservation() {
    const [reservationDetails, setReservationDetails] = useState({
        catwayType: '',
        catwayNumber: '',
        clientName: '',
        boatName: '',
        startDate: '',
        endDate: '',
    });
    const [catways, setCatways] = useState([]); // Pour stocker les catways disponibles
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Fonction pour récupérer les catways selon le type sélectionné
    useEffect(() => {
        const fetchCatways = async () => {
            if (reservationDetails.catwayType) { // Vérifier si un type est sélectionné
                try {
                    const response = await axios.get('http://localhost:8080/api/catways', {
                        params: { catwayType: reservationDetails.catwayType },
                    });

                    if (response.data && Array.isArray(response.data)) {
                        setCatways(response.data); // Mettre à jour les catways disponibles
                    } else {
                        setCatways([]); // Si la réponse est vide ou mal formatée, réinitialiser la liste
                        console.log('Aucun catway trouvé');
                    }
                } catch (error) {
                    console.error("Erreur lors de la récupération des catways:", error);
                    setCatways([]); // En cas d'erreur, réinitialiser les catways
                }
            }
        };

        fetchCatways();
    }, [reservationDetails.catwayType]); // Se déclenche lorsque le type de catway change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setReservationDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));

    };

    const checkAvailability = async (data) => {
        try {
            const { catwayNumber, boatName, catwayType, clientName, startDate, endDate } = data;

            const response = await axios.post("http://localhost:8080/api/reservation", {
                catwayNumber,
                catwayType,
                boatName,
                clientName,
                startDate,
                endDate,
            });

            if (response.status === 200) {
                return true; // Catway disponible
            } else {
                setErrorMessage(response.data.message); // Message d'erreur (catway déjà réservé)
                return false;
            }
        } catch (error) {
            console.error("Erreur lors de la vérification de la disponibilité:", error);
            setErrorMessage("Ce catway et indisponible durant cette periode. Veuillez en choisir un autre.");
            return false;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!reservationDetails.catwayNumber || !reservationDetails.clientName || !reservationDetails.boatName || !reservationDetails.startDate || !reservationDetails.endDate) {
            setErrorMessage("Veuillez remplir tous les champs.");
            return;
        }

        try {
            console.log("Base URL:", "http://localhost:8080/api/reservation"); // Pour déboguer
            // Vérifier la disponibilité avant de procéder à la réservation
            const isAvailable = await checkAvailability(reservationDetails); // Appel à checkAvailability ici
            if (!isAvailable) {
                return; // Si le catway n'est pas disponible, arrêter la soumission
            }

            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/reservation`, reservationDetails);
            alert(response.data.message);
            setReservationDetails({
                catwayType: '',
                catwayNumber: '',
                clientName: '',
                boatName: '',
                startDate: '',
                endDate: '',
            });
            setSuccessMessage("Réservation effectuée avec succès !");
            setErrorMessage(''); // Réinitialiser l'erreur
        } catch (error) {
            console.error("Erreur lors de la réservation:", error);
            alert("Erreur lors de la soumission de la réservation");
        }
    };

    return (
        <div className="container mt-5">
            <h2>Faire une réservation</h2>
            <Form onSubmit={handleSubmit} className="form-container" style={{ maxWidth: '600px', margin: '0 auto' }}>
                <Row>
                    {/* Liste déroulante pour choisir "Long" ou "Short" */}
                    <Col xs={12} md={6}>
                        <Form.Group className="mb-3" controlId="formCatwayType">
                            <Form.Label>Type de catway</Form.Label>
                            <Form.Control
                                as="select"
                                name="catwayType"
                                value={reservationDetails.catwayType}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Choisir un type</option>
                                <option value="long">Long</option>
                                <option value="short">Short</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>

                    {/* Liste déroulante pour choisir un numéro de catway de 1 à 24 */}
                    <Col xs={12} md={6}>
                        <Form.Group className="mb-3" controlId="formCatwayNumber">
                            <Form.Label>Numéro du catway</Form.Label>
                            <Form.Control
                                as="select"
                                name="catwayNumber"
                                value={reservationDetails.catwayNumber}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Choisir un catway</option>
                                {catways.length > 0 ? (
                                    catways.map((catway) => (
                                        <option key={catway.catwayNumber} value={catway.catwayNumber}>
                                            {catway.catwayNumber}
                                        </option>
                                    ))
                                ) : (
                                    <option disabled>Aucun catway disponible</option>
                                )}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>

                {/* Formulaire client et bateau */}
                <Form.Group className="mb-3" controlId="formClientName">
                    <Form.Label>Nom du client</Form.Label>
                    <Form.Control
                        type="text"
                        name="clientName"
                        value={reservationDetails.clientName}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBoatName">
                    <Form.Label>Nom du bateau</Form.Label>
                    <Form.Control
                        type="text"
                        name="boatName"
                        value={reservationDetails.boatName}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Row>
                    <Col xs={12} md={6}>
                        <Form.Group className="mb-3" controlId="formStartDate">
                            <Form.Label>Date de début de la réservation</Form.Label>
                            <Form.Control
                                type="date"
                                name="startDate"
                                value={reservationDetails.startDate}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                        <Form.Group className="mb-3" controlId="formEndDate">
                            <Form.Label>Date de fin de la réservation</Form.Label>
                            <Form.Control
                                type="date"
                                name="endDate"
                                value={reservationDetails.endDate}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Button variant="primary" type="submit" className="w-100">
                    Soumettre la réservation
                </Button>
                {/* Affichage du message d'erreur */}
                {errorMessage && <div className="mt-3 alert alert-danger">{errorMessage}</div>}

                {/* Affichage du message de succès */}
                {successMessage && <div className="mt-3 alert alert-success">{successMessage}</div>}
            </Form>
        </div>
    );
}