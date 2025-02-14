import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Row, Col, Container, Button, Modal, Form } from 'react-bootstrap';

// Fonction pour formater la date au format 'yyyy-MM-ddTHH:mm'
const formatDateForInput = (date) => {
    const localDate = new Date(date);
    const year = localDate.getFullYear();
    const month = String(localDate.getMonth() + 1).padStart(2, '0'); // Mois 1-12
    const day = String(localDate.getDate()).padStart(2, '0'); // Jour 01-31
    const hours = String(localDate.getHours()).padStart(2, '0'); // Heures 00-23
    const minutes = String(localDate.getMinutes()).padStart(2, '0'); // Minutes 00-59

    return `${year}-${month}-${day}T${hours}:${minutes}`;
};

const Reservation = () => {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedReservation, setSelectedReservation] = useState(null);
    const [formData, setFormData] = useState({
        catwayNumber: '',
        clientName: '',
        boatName: '',
        startDate: '',
        endDate: ''
    });


    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/reservation');
                setReservations(response.data);
            } catch (err) {
                setError('Erreur lors de la récupération des réservations');
            } finally {
                setLoading(false);
            }
        };

        fetchReservations();
    }, []);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Function to open the edit modal and set form data
    const handleEdit = (reservation) => {
        setSelectedReservation(reservation);
        setFormData({
            catwayNumber: reservation.catwayNumber,
            clientName: reservation.clientName,
            boatName: reservation.boatName,
            startDate: formatDateForInput(reservation.startDate),  // Formater startDate
            endDate: formatDateForInput(reservation.endDate)  // Formater endDate
        });
        setShowModal(true);
    };

    // supprimer  la reservation
    const handleDelete = async (reservationId) => {
        try {
            // Assurez-vous que l'ID est correct
            await axios.delete(`http://localhost:8080/api/reservation/${reservationId}`);
            setReservations(reservations.filter(reservation => reservation._id !== reservationId));
        } catch (err) {
            setError('Erreur lors de la suppression de la réservation');
            console.error(err);
        }
    };

    // Fonction pour gérer la suppression d'une réservation
    const handleSubmit = async (e) => {
        e.preventDefault();


        // Convertir les dates en format ISO
        const updatedReservation = {
            ...formData,
            startDate: new Date(formData.startDate).toISOString(),  // Conversion en ISO 8601
            endDate: new Date(formData.endDate).toISOString()  // Conversion en ISO 8601
        };

        try {
            const response = await axios.put(`http://localhost:8080/api/reservation/${selectedReservation._id}`, updatedReservation);
            setReservations(reservations.map(reservation =>
                reservation._id === selectedReservation._id ? response.data : reservation
            ));
            setShowModal(false);
        } catch (err) {
            setError('Erreur lors de la modification de la réservation');
        }
    };

    if (loading) {
        return <div className="text-center">Chargement...</div>;
    }

    if (error) {
        return <div className="text-center text-danger">{error}</div>;
    }

    return (
        <Container>
            <h1 className="my-4 text-center">Liste des Réservations</h1>
            <Row>
                {reservations.length === 0 ? (
                    <p className="text-center">Aucune réservation disponible.</p>
                ) : (
                    reservations.map((reservation) => (
                        <Col key={reservation._id} sm={12} md={6} lg={4} className="mb-4">
                            <Card className="shadow-sm">
                                <Card.Header className="bg-primary text-white">
                                    <h5>Catway {reservation.catwayNumber}</h5>
                                </Card.Header>
                                <Card.Body>
                                    <Card.Subtitle className="mb-2 text-muted"><strong>Nom :</strong> {reservation.clientName}</Card.Subtitle>
                                    <Card.Text>
                                        <strong>Bateau :</strong> {reservation.boatName}
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Début :</strong> {new Date(reservation.startDate).toLocaleString()}
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Fin :</strong> {new Date(reservation.endDate).toLocaleString()}
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer className="text-center">
                                    <Button variant="warning" size="sm" onClick={() => handleEdit(reservation)}>Modifier</Button>{' '}
                                    <Button variant="danger" size="sm" onClick={() => handleDelete(reservation._id)}>Supprimer</Button>
                                </Card.Footer>
                            </Card>
                        </Col>
                    ))
                )}
            </Row>

            {/* Modal pour modifier la réservation */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Modifier la Réservation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="catwayNumber">
                            <Form.Label>Numéro Catway</Form.Label>
                            <Form.Control
                                type="text"
                                name="catwayNumber"
                                value={formData.catwayNumber}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="clientName">
                            <Form.Label>Nom du Client</Form.Label>
                            <Form.Control
                                type="text"
                                name="clientName"
                                value={formData.clientName}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="boatName">
                            <Form.Label>Nom du Bateau</Form.Label>
                            <Form.Control
                                type="text"
                                name="boatName"
                                value={formData.boatName}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="startDate">
                            <Form.Label>Date de début</Form.Label>
                            <Form.Control
                                type="datetime-local"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="endDate">
                            <Form.Label>Date de fin</Form.Label>
                            <Form.Control
                                type="datetime-local"
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">Sauvegarder</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default Reservation;