pour lancer le server:
cd api
npm nodemon server

Pour lancer react
cd mon-projet-api
npm start.

Le lien pour connecter mongo compass:
mongodb+srv://<db_username>:<db_password>@cluster0.pikrp.mongodb.net/

Étapes de développement

Initialisation du projet
Initialiser un dépôt Git.
Créer les fichiers package.json pour le frontend et le backend.
Configurer Docker et MongoDB.

Backend : Mise en place de l'API
Configuration de la base de données : Configurer MongoDB avec les collections catways, reservations et users.
Modèles Mongoose : Créer les schémas Mongoose pour les modèles Catway, Reservation et User.
Contrôleurs : Implémenter les contrôleurs pour gérer les opérations CRUD pour chaque modèle.
Routes : Créer les routes RESTful pour les catways, réservations et utilisateurs.
Authentification : Mettre en place un système d'authentification JWT pour protéger les routes.
Documentation : Documenter l'API avec Swagger ou Postman.

Frontend : Création des interfaces utilisateur
Connexion et tableau de bord : Créer une page d'accueil avec un formulaire de connexion et une redirection vers le tableau de bord.
CRUD pour les catways, réservations et utilisateurs : Créer les formulaires et les interfaces permettant de gérer les opérations CRUD.
Intégration API : Connecter le frontend au backend en utilisant les routes API.

Tests et validation
Tester toutes les routes API (via Postman ou tests unitaires).
Tester les formulaires et les opérations CRUD dans le frontend.
Valider les règles de gestion (validation des données, unicité, etc.).
