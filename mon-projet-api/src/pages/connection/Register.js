import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function Register() {

    // Utilisation de useState pour gérer l'affichage du mot de passe
    const [toggle, setToggle] = useState(false);

    // Fonction pour basculer la visibilité du mot de passe
    const showPassword = (e) => {
        e.preventDefault();
        setToggle(!toggle);
    };

    const initialValues = {
        lastname: "",
        firstname: "",
        email: "",
        password: ""
    };

    const [formValues, setFormValues] = useState(initialValues);
    const [errors, setErrors] = useState({}); // Utiliser pour stocker les erreurs de validation

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

        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formValues.email) errorFields.email = "L'email est obligatoire";
        else if (!regexEmail.test(formValues.email)) errorFields.email = "Email invalide";

        const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,20}$/;
        if (!formValues.password) errorFields.password = "Le mot de passe est obligatoire";
        else if (!regexPassword.test(formValues.password)) errorFields.password = "10 - 20 caractères, 2 Maj, 2 min, sans espace";

        return errorFields;
    };

    const handleSubmit = e => {
        e.preventDefault();
        const validationErrors = verifyInput(formValues);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            console.log("Formulaire soumis avec succès", formValues);
        }
    };

    return (
        <main className="container mt-5">
            <form className="w-50 mx-auto">
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
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        id="email"
                        name="email"
                        placeholder="Entrez votre email"
                        value={formValues.email}
                        onChange={handleChange}
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
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

                <button type="submit" className="btn btn-primary w-100" onClick={handleSubmit}>S'inscrire</button>

                <h2 className="mt-4 text-center">
                    Déjà enregistré ? <a href="/login">Se connecter</a>
                </h2>
            </form>
        </main>
    );
}