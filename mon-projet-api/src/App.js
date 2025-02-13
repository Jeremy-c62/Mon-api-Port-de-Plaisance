import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from './pages/connection/Register';
import Login from './pages/connection/Login';
import Home from './pages/home';
import Layout from './components/Layout.js';
import Reservation from './pages/Reservation';
import CardsReservation from './pages/ReservationCard.js';
import UserManagementPage from './pages/UserManagementPage';  // Importation de la nouvelle page UserManagementPage

function App() {
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
          element: <Home />  // Accessible sans authentification
        },
        {
          path: '/reservation',  // Page de réservation
          element: <Reservation />  // Accessible sans authentification
        },
        {
          path: '/reservationCards',  // Nouvelle route pour les cartes de réservation
          element: <CardsReservation />  // Accessible sans authentification
        },

        {
          path: '/userManagement',  // Nouvelle route pour la page UserManagementPage
          element: <UserManagementPage />  // Page de gestion des utilisateurs avec fonctionnalité complète
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