import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axios from "axios";

export default function Register() {

    // Utilisation de useState pour gérer l'affichage du mot de passe
    const [toggle, setToggle] = useState(false);

    // Fonction pour basculer la visibilité du mot de passe
    const showPassword = (e) => {
        e.preventDefault(); // Empêche la soumission du formulaire
        setToggle(!toggle);
    };

    const initialValues = {
        lastname: "",
        firstname: "",
        email: "",
        password: ""
    };

    const [formValues, setFormValues] = useState(initialValues);
    const [formError, setFormError] = useState({});
    const [errors, setErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const handleChange = e => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const verifyInput = (formValues) => {
        const errorFields = {};
        const regexName = /^([A-Za-z\s]{3,15})$/;

        if (!formValues.lastname) errorFields.lastname = "Le prénom est obligatoire";
        else if (!regexName.test(formValues.lastname)) errorFields.lastname = "3 - 15 caractères, sans caractères spéciaux";

        if (!formValues.firstname) errorFields.firstname = "Le nom est obligatoire";
        else if (!regexName.test(formValues.firstname)) errorFields.firstname = "3 - 15 caractères, sans caractères spéciaux";

        const regexEmail = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
        if (!formValues.email) errorFields.email = "L'email est obligatoire";
        else if (!regexEmail.test(formValues.email)) errorFields.email = "Email invalide";

        const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,20}$/;
        if (!formValues.password) errorFields.password = "Le mot de passe est obligatoire";
        else if (!regexPassword.test(formValues.password)) errorFields.password = "10 - 20 caractères, 2 Maj, 2 min, sans espace";

        return errorFields;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Vérifier les erreurs de validation
        const validationErrors = verifyInput(formValues);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors); // Afficher les erreurs de validation sur les champs
        } else {
            try {
                // Envoyer la requête POST avec axios
                const response = await axios.post(`http://localhost:8080/api/users`, formValues)
                console.log("Formulaire soumis avec succès", response.data);
                setIsSubmit(true); // Mettre à jour l'état de soumission réussie
                setFormValues(initialValues); // Réinitialiser les valeurs du formulaire

                // Réinitialiser les erreurs de validation
                setErrors({});
                setFormError({});

                // Effacer le message d'inscription validée après 3 secondes
                setTimeout(() => {
                    setIsSubmit(false);
                }, 3000);

            } catch (error) {
                // Si l'email est déjà utilisé, gérer l'erreur
                if (error.response && error.response.data.error && error.response.data.error.name === "ValidationError") {
                    setFormError({ email: "Cet email est déjà utilisé." });
                } else {
                    setFormError({ email: "Une erreur est survenue. Veuillez réessayer." });
                }
            }
        }
    };

    return (
        <main className="container mt-5">
            {Object.keys(formError).length === 0 && isSubmit &&
                <div className="alert alert-success" role="alert">Inscription validée !</div>}
            <form className="w-50 mx-auto" onSubmit={handleSubmit}>
                <h1 className="mb-4">S'inscrire</h1>

                <div className="mb-3">
                    <label htmlFor="lastname" className="form-label">Prénom</label>
                    <input
                        type="text"
                        className={`form-control ${errors.lastname ? 'is-invalid' : ''}`}
                        id="lastname"
                        name="lastname"
                        placeholder="Entrez votre prénom"
                        value={formValues.lastname}
                        onChange={handleChange}
                    />
                    {errors.lastname && <div className="invalid-feedback">{errors.lastname}</div>}
                </div>

                <div className="mb-3">
                    <label htmlFor="firstname" className="form-label">Nom</label>
                    <input
                        type="text"
                        className={`form-control ${errors.firstname ? 'is-invalid' : ''}`}
                        id="firstname"
                        name="firstname"
                        placeholder="Entrez votre nom"
                        value={formValues.firstname}
                        onChange={handleChange}
                    />
                    {errors.firstname && <div className="invalid-feedback">{errors.firstname}</div>}
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className={`form-control ${errors.email || formError.email ? 'is-invalid' : ''}`}
                        id="email"
                        name="email"
                        placeholder="Entrez votre email"
                        value={formValues.email}
                        onChange={handleChange}
                    />
                    {/* Afficher l'erreur spécifique pour l'email */}
                    {(errors.email || formError.email) && <div className="invalid-feedback">{formError.email || errors.email}</div>}
                </div>

                <div className="mb-3 position-relative">
                    <label htmlFor="password" className="form-label">Mot de passe</label>
                    <div className="input-group">
                        <input
                            type={toggle ? "text" : "password"}
                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                            id="password"
                            name="password"
                            placeholder="Entrez votre mot de passe"
                            value={formValues.password}
                            onChange={handleChange}
                        />
                        <button className="btn btn-outline-secondary" onClick={showPassword} type="button">
                            {toggle ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </button>
                    </div>
                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>

                <button type="submit" className="btn btn-primary w-100">S'inscrire</button>

                <h2 className="mt-4 text-center">
                    Déjà enregistré ? <a href="/login">Se connecter</a>
                </h2>
            </form>
        </main>
    );
}