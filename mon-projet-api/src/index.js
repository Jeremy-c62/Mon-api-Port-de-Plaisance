import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthProvider } from "./context/authContext";  // Assure-toi que le chemin est correct

ReactDOM.render(
    <AuthProvider>
        <App />
    </AuthProvider>,
    document.getElementById("root")
);