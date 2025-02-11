import React, { useContext } from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Register from './pages/connection/Register';
import Login from './pages/connection/Login';
import Home from './pages/home';
import Layout from './components/Layout.js';
import Reservation from './pages/Reservation'; // Importer la page de réservation
import { AuthContext } from "./context/authContext.js";

function App() {
  const { currentUser } = useContext(AuthContext);  // Utilisation du contexte d'authentification

  // Composant pour protéger les routes privées
  const PrivateRoute = ({ children }) => {
    if (!currentUser) {
      // Si l'utilisateur n'est pas connecté, on le redirige vers la page de login
      return <Navigate to="/login" />;
    }
    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,  // Utilisation du Layout global
      children: [
        {
          path: '/',  // Page d'accueil principale
          element: <Home />
        },
        {
          path: '/register',  // Page d'inscription
          element: <Register />
        },
        {
          path: '/login',  // Page de connexion
          element: <Login />
        },
        {
          path: '/dashboard',  // Nouvelle page d'accueil après connexion
          element: (
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          ),
        },
        {
          path: '/reservation',  // Page de réservation
          element: (
            <PrivateRoute>
              <Reservation /> {/* Composant pour la page de réservation */}
            </PrivateRoute>
          ),
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;