import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap'; // Importer Modal et Button de react-bootstrap

const Cataway = () => {
    const [catways, setCatways] = useState([]);
    const [newCatway, setNewCatway] = useState({ catwayType: '', catwayState: '' });
    const [editCatway, setEditCatway] = useState(null);
    const [showModal, setShowModal] = useState(false); // Etat pour contrôler l'ouverture/fermeture de la modal

    // Récupérer les catways depuis l'API
    useEffect(() => {
        axios.get('http://localhost:8080/api/catways')
            .then((response) => {
                console.log('Fetched catways:', response.data);
                setCatways(response.data);
            })
            .catch((error) => {
                console.error('Error fetching catways:', error);
            });
    }, []);

    // Ajouter un nouveau catway
    const handleAddCatway = () => {
        if (!newCatway.catwayType || !newCatway.catwayState) {
            alert('Tous les champs sont obligatoires');
            return;
        }

        // Déterminer automatiquement le prochain catwayNumber
        const newCatwayNumber = catways.length + 1;

        const newCatwayData = {
            catwayNumber: newCatwayNumber,
            catwayType: newCatway.catwayType,
            catwayState: newCatway.catwayState
        };

        axios.post('http://localhost:8080/api/catways', newCatwayData)
            .then((response) => {
                setCatways([...catways, response.data]);
                setNewCatway({ catwayType: '', catwayState: '' });
            })
            .catch((error) => {
                console.error('Error adding catway:', error);
            });
    };

    // Supprimer un catway
    const handleDeleteCatway = (id) => {
        console.log('Deleting catway with id:', id);
        axios.delete(`http://localhost:8080/api/catways/${id}`)
            .then(() => {
                setCatways(catways.filter(catway => catway._id !== id));
            })
            .catch((error) => {
                console.error('Error deleting catway:', error);
            });
    };

    // Mettre à jour un catway
    const handleUpdateCatway = () => {
        if (!editCatway.catwayType || !editCatway.catwayState) {
            alert('Tous les champs sont obligatoires');
            return;
        }

        axios.put(`http://localhost:8080/api/catways/${editCatway._id}`, editCatway)
            .then((response) => {
                setCatways(catways.map(catway => (catway._id === response.data._id ? response.data : catway)));
                setEditCatway(null);
                setShowModal(false); // Fermer la modal après la mise à jour
            })
            .catch((error) => {
                console.error('Error updating catway:', error);
            });
    };

    // Gérer le changement du type du catway
    const handleChangeCatwayType = (e) => {
        if (editCatway) {
            setEditCatway({ ...editCatway, catwayType: e.target.value });
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center">Tableau de gestion des Catway</h2>

            {/* Formulaire d'ajout */}
            <h3 className="text-center">Ajouter un Catway</h3>
            <div className="mb-3">
                <input
                    className="form-control"
                    type="number"
                    value={catways.length + 1} // Affiche le prochain numéro automatiquement
                    disabled
                    placeholder="Catway Number"
                />
            </div>
            <div className="mb-3">
                <select
                    className="form-control"
                    value={newCatway.catwayType}
                    onChange={(e) => setNewCatway({ ...newCatway, catwayType: e.target.value })}
                >
                    <option value="">Select Type</option>
                    <option value="short">Short</option>
                    <option value="long">Long</option>
                </select>
            </div>
            <div className="mb-3">
                <input
                    className="form-control"
                    type="text"
                    value={newCatway.catwayState}
                    onChange={(e) => setNewCatway({ ...newCatway, catwayState: e.target.value })}
                    placeholder="Catway State"
                />
            </div>
            <div className="text-center">
                <button className="btn btn-primary" onClick={handleAddCatway}>Ajouter Catway</button>
            </div>

            <h3 className="text-center">Gestion des Catway</h3>
            <table className="table table-striped table-bordered text-center mt-4">
                <thead>
                    <tr>
                        <th>Number</th>
                        <th>Type</th>
                        <th>State</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {catways.map((catway) => (
                        <tr key={catway._id}>
                            <td>{catway.catwayNumber}</td>
                            <td>
                                <select
                                    className="form-control"
                                    value={catway.catwayType}
                                    onChange={(e) => {
                                        setCatways(catways.map(c =>
                                            c._id === catway._id ? { ...c, catwayType: e.target.value } : c
                                        ));
                                    }}
                                >
                                    <option value="short">Short</option>
                                    <option value="long">Long</option>
                                </select>
                            </td>
                            <td>{catway.catwayState}</td>
                            <td>
                                <button className="btn btn-warning mx-2" onClick={() => { setEditCatway(catway); setShowModal(true); }}>Modifier</button>
                                <button className="btn btn-danger" onClick={() => handleDeleteCatway(catway._id)}>Supprimer</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal de modification */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Modifier Catway</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {editCatway && (
                        <div>
                            <div className="mb-3">
                                <input
                                    className="form-control"
                                    type="number"
                                    value={editCatway.catwayNumber} // Affichage du numéro actuel mais non modifiable
                                    disabled
                                />
                            </div>
                            <div className="mb-3">
                                <select
                                    className="form-control"
                                    value={editCatway.catwayType}
                                    onChange={handleChangeCatwayType}
                                >
                                    <option value="short">Short</option>
                                    <option value="long">Long</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <input
                                    className="form-control"
                                    type="text"
                                    value={editCatway.catwayState}
                                    onChange={(e) => setEditCatway({ ...editCatway, catwayState: e.target.value })}
                                />
                            </div>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Fermer
                    </Button>
                    <Button variant="primary" onClick={handleUpdateCatway}>
                        Sauvegarder les modification
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Cataway;