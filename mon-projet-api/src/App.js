import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Register from './pages/connection/Register';
import Login from './pages/connection/Login';
import Home from './pages/home';
import Layout from './components/Layout.js';  // Importez le Layout global

function App() {

  const connected = false;  // Définir la connexion, à ajuster selon l'état réel de l'utilisateur

  // Composant pour protéger les routes privées
  const PrivateRoute = ({ children }) => {
    if (!connected) {
      // Si non connecté, redirige vers la page de login
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
          path: '/',  // Page d'accueil, toujours accessible
          element: <Home />
        },
        {
          path: '/register',  // Page d'inscription, pas protégée
          element: <Register />
        },
        {
          path: '/login',  // Page de connexion, pas protégée
          element: <Login />
        },
        {
          path: '/profile',  // Exemple de page privée (ex: profil utilisateur)
          element: (
            <PrivateRoute>
              <div>Page de profil</div>
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