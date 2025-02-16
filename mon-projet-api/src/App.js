import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from './connection/Register.js';
import Login from './connection/Login.js';
import Home from './pages/home';
import Layout from './components/Layout.js';
import Reservation from './pages/Reservation';
import CardsReservation from './pages/ReservationCard.js';
import UserManagementPage from './pages/UserManagementPage';
import PrivateRoute from './components/PrivateRoute';  // Import du composant PrivateRoute

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,  // Utilisation du Layout global
      children: [
        {
          path: '/register',  // Page d'inscription
          element: <Register />
        },
        {
          path: '/',  // Page de connexion
          element: <Login />
        },
        {
          path: '/home',  // Nouvelle page d'accueil après connexion
          element: <Home />  // Accessible sans authentification
        },
        {
          path: '/reservation',  // Page de réservation
          element: (
            <PrivateRoute>
              <Reservation />
            </PrivateRoute>
          )  // Accessible seulement après authentification
        },
        {
          path: '/reservationCards',  // Nouvelle route pour les cartes de réservation
          element: (
            <PrivateRoute>
              <CardsReservation />
            </PrivateRoute>
          )  // Accessible seulement après authentification
        },
        {
          path: '/userManagement',  // Nouvelle route pour la page UserManagementPage
          element: (
            <PrivateRoute>
              <UserManagementPage />
            </PrivateRoute>
          )  // Accessible seulement après authentification
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