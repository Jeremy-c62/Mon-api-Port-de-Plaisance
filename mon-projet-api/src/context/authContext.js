import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [formError, setFormError] = useState(false);
    const [successfullyLogin, setSuccessfullyLogin] = useState(false);

    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem('user')) || null
    );



    const login = (formValues) => {
        axios.post('http://localhost:8080/api/users', formValues)
            .then((res) => {
                console.log(res.data);
                setCurrentUser(res.data);
                setSuccessfullyLogin(true);

            })
            .catch(error => {
                setFormError(true);
            });
    };

    useEffect(() => {
        if (currentUser) {
            localStorage.setItem('user', JSON.stringify(currentUser));
        }
    }, [currentUser]);

    const logout = () => {
        setCurrentUser(null); // Réinitialiser l'utilisateur courant
        localStorage.removeItem('null');
    };

    return (
        <AuthContext.Provider value={{ successfullyLogin, currentUser, login, formError, logout }}>
            {children}
        </AuthContext.Provider>
    );
};