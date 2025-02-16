import React from 'react';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import '../asset/Footer.css'; // Si tu choisis de mettre ton style dans un fichier séparé

const Footer = () => {
    return (
        <footer className="bg-dark text-white py-4 custom-footer">
            <Container>
                <Row>
                    {/* Bloc 1: Liens de navigation */}
                    <Col md={4} className="mb-4">
                        <h5>Navigation</h5>
                        <ListGroup variant="flush">
                            <ListGroup.Item className="bg-dark border-0 text-white">
                                <a href="/" className="text-white text-decoration-none">Accueil</a>
                            </ListGroup.Item>
                            <ListGroup.Item className="bg-dark border-0 text-white">
                                <a href="/register" className="text-white text-decoration-none">S'inscrire</a>
                            </ListGroup.Item>
                            <ListGroup.Item className="bg-dark border-0 text-white">
                                <a href="/login" className="text-white text-decoration-none">Se connecter</a>
                            </ListGroup.Item>
                            <ListGroup.Item className="bg-dark border-0 text-white">
                                <a href="/reservation" className="text-white text-decoration-none">Réservations</a>
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>

                    {/* Bloc 2: Mentions légales, tout savoir et copyright */}
                    <Col md={4} className="mb-4">
                        <h5>Informations</h5>
                        <ListGroup variant="flush">
                            <ListGroup.Item className="bg-dark border-0 text-white">
                                <a href="/legal" className="text-white text-decoration-none">Mentions légales</a>
                            </ListGroup.Item>
                            <ListGroup.Item className="bg-dark border-0 text-white">
                                <a href="/privacy" className="text-white text-decoration-none">Tout savoir</a>
                            </ListGroup.Item>
                            <ListGroup.Item className="bg-dark border-0 text-white">
                                <span>&copy; 2025 MonSite - Tous droits réservés</span>
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>

                    {/* Bloc 3: Nous contacter et réseaux sociaux */}
                    <Col md={4} className="mb-4">
                        <h5>Contactez-nous</h5>
                        <ListGroup variant="flush">
                            <ListGroup.Item className="bg-dark border-0 text-white">
                                <a href="/contact" className="text-white text-decoration-none">Nous contacter</a>
                            </ListGroup.Item>
                            <ListGroup.Item className="bg-dark border-0 text-white">
                                <a href="https://www.facebook.com" className="text-white text-decoration-none" target="_blank" rel="noopener noreferrer">Facebook</a>
                            </ListGroup.Item>
                            <ListGroup.Item className="bg-dark border-0 text-white">
                                <a href="https://www.twitter.com" className="text-white text-decoration-none" target="_blank" rel="noopener noreferrer">Twitter</a>
                            </ListGroup.Item>
                            <ListGroup.Item className="bg-dark border-0 text-white">
                                <a href="https://www.instagram.com" className="text-white text-decoration-none" target="_blank" rel="noopener noreferrer">Instagram</a>
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;