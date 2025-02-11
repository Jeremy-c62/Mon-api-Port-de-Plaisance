import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

export default function Reservation() {
    const [reservationDetails, setReservationDetails] = useState({
        catwayNumber: '',
        clientName: '',
        boatName: '',
        startDate: '',
        endDate: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setReservationDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Envoyer les données au backend
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/reservations`, reservationDetails);
            alert(response.data.message);
            setReservationDetails({
                catwayNumber: '',
                clientName: '',
                boatName: '',
                startDate: '',
                endDate: '',
            });
        } catch (error) {
            console.error("Erreur lors de la réservation:", error);
            alert("Erreur lors de la soumission de la réservation");
        }
    };

    return (
        <div className="container mt-5">
            <h2>Faire une réservation</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formCatwayNumber">
                    <Form.Label>Numéro du catway</Form.Label>
                    <Form.Control
                        type="number"
                        name="catwayNumber"
                        value={reservationDetails.catwayNumber}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

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

                <Button variant="primary" type="submit">
                    Soumettre la réservation
                </Button>
            </Form>
        </div>
    );
}