import React from 'react';
import { Navigate } from 'react-router-dom';

// Composant de route privée
const PrivateRoute = ({ children }) => {
    const isAuthenticated = !!localStorage.getItem('token'); // ou une autre logique d'authentification

    return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;