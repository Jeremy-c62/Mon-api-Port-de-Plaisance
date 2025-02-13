import React, { useState, } from 'react';
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
            console.log("Base URL:", "http://localhost:8080/api/reservation"); // Pour déboguer

            const response = await axios.post("http://localhost:8080/api/reservation", reservationDetails);
            alert(response.data.message);
            setReservationDetails({
                catwayType: '',
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
                                {Array.from({ length: 24 }, (_, i) => i + 1).map((number) => (
                                    <option key={number} value={number}>
                                        {number}
                                    </option>
                                ))}
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
            </Form>
        </div>
    );
}