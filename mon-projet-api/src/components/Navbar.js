
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Navbar() {


    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Port de plaisance Russel</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" to="/">Accueil</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Inscription</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Connexion</Link>
                        </li>
                        {/* Lien "Réservation" visible même si l'utilisateur n'est pas connecté */}
                        <li className="nav-item">
                            <Link className="nav-link" to="/reservation">Réservation</Link>
                        </li>
                        {/* Lien "Cartes de Réservation" visible même si l'utilisateur n'est pas connecté */}
                        <li className="nav-item">
                            <Link className="nav-link" to="/ReservationCards">Cartes de Réservation</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/userManagement">Gestion du Profil</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}