import React from "react";
import ReactDOM from "react-dom/client";  // Remplace "react-dom" par "react-dom/client"
import App from "./App";
import { AuthProvider } from "./context/authContext";  // Assure-toi que le chemin est correct

const root = ReactDOM.createRoot(document.getElementById("root"));  // Utilise createRoot
root.render(
    <AuthProvider>
        <App />
    </AuthProvider>
);