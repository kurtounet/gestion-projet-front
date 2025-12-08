// export const TASK_MOCK:ITask[] = shuffle([
//     {
//       "id": 1,
//       "title": "Initialiser le moteur IA",
//       "assignedTo": "Équipe IA",
//       "tags": ["configuration", "urgent"],
//       "dueDate": "2025-07-26",
//       "completed": "todo",
//       "position": 0,
//       "dependencies": [],
//       "subtasks": [
//         "Configurer l’environnement Python",
//         "Installer les dépendances ML",
//         "Vérifier les versions CUDA"
//       ],
//       "priority": 2
//     },
//     {
//       "id": 2,
//       "title": "Collecter les jeux de données",
//       "assignedTo": "Ingénieur Data",
//       "tags": ["données", "analyse"],
//       "dueDate": "2025-07-28",
//       "completed": "todo",
//       "position": 1,
//       "dependencies": [],
//       "subtasks": [
//         "Définir le schéma du dataset",
//         "Écrire le pipeline ETL",
//         "Stocker sur S3"
//       ],
//       "priority": 1
//     },
//     {
//       "id": 3,
//       "title": "Entraîner le modèle de base",
//       "assignedTo": "Ingénieur ML",
//       "tags": ["modélisation", "en cours"],
//       "dueDate": "2025-07-30",
//       "completed": "progress",
//       "position": 2,
//       "dependencies": [1, 2],
//       "subtasks": [
//         "Lancer le script training.py",
//         "Surveiller les logs TensorBoard"
//       ],
//       "priority": 2
//     },
//     {
//       "id": 4,
//       "title": "Définir le backlog initial",
//       "assignedTo": "Product Owner",
//       "tags": ["planification"],
//       "dueDate": "2025-07-22",
//       "completed": "done",
//       "position": 3,
//       "dependencies": [],
//       "subtasks": [
//         "Lister les fonctionnalités",
//         "Prioriser les user stories"
//       ],
//       "priority": 1
//     },
//     {
//       "id": 5,
//       "title": "Documenter l'architecture du système",
//       "assignedTo": "Architecte",
//       "tags": ["documentation"],
//       "dueDate": "2025-08-01",
//       "completed": "todo",
//       "position": 4,
//       "dependencies": [1],
//       "subtasks": [
//         "Dessiner le diagramme UML",
//         "Valider avec l'équipe"
//       ],
//       "priority": 1
//     },
//     {
//       "id": 6,
//       "title": "Design de l'interface utilisateur",
//       "assignedTo": "UI/UX Designer",
//       "tags": ["UI", "design"],
//       "dueDate": "2025-08-02",
//       "completed": "todo",
//       "position": 5,
//       "dependencies": [],
//       "subtasks": [
//         "Créer maquettes Figma",
//         "Recueillir feedback"
//       ],
//       "priority": 1
//     },
//     {
//       "id": 7,
//       "title": "Configurer la base de données",
//       "assignedTo": "DevOps",
//       "tags": ["infra"],
//       "dueDate": "2025-08-03",
//       "completed": "todo",
//       "position": 6,
//       "dependencies": [],
//       "subtasks": [
//         "Choisir SGBD",
//         "Définir schéma tables"
//       ],
//       "priority": 2
//     },
//     {
//       "id": 8,
//       "title": "Planifier tests unitaires",
//       "assignedTo": "QA Engineer",
//       "tags": ["tests"],
//       "dueDate": "2025-08-04",
//       "completed": "todo",
//       "position": 7,
//       "dependencies": [3],
//       "subtasks": [
//         "Lister cas de test",
//         "Configurer framework Jest"
//       ],
//       "priority": 1
//     },
//     {
//       "id": 9,
//       "title": "Mettre en place monitoring",
//       "assignedTo": "DevOps",
//       "tags": ["infra", "monitoring"],
//       "dueDate": "2025-08-05",
//       "completed": "todo",
//       "position": 8,
//       "dependencies": [],
//       "subtasks": [
//         "Installer Prometheus",
//         "Configurer alertes"
//       ],
//       "priority": 1
//     },
//     {
//       "id": 10,
//       "title": "Optimiser performances",
//       "assignedTo": "Ingénieur ML",
//       "tags": ["optimisation"],
//       "dueDate": "2025-08-06",
//       "completed": "todo",
//       "position": 9,
//       "dependencies": [3],
//       "subtasks": [
//         "Profilage du code",
//         "Réduire latence"
//       ],
//       "priority": 2
//     },
//     {
//       "id": 11,
//       "title": "Rédiger guide de contribution",
//       "assignedTo": "Équipe IA",
//       "tags": ["documentation"],
//       "dueDate": "2025-08-07",
//       "completed": "todo",
//       "position": 10,
//       "dependencies": [],
//       "subtasks": [
//         "Expliquer workflow Git",
//         "Ajouter templates PR"
//       ],
//       "priority": 0
//     },
//     {
//       "id": 12,
//       "title": "Configurer notifications Slack",
//       "assignedTo": "DevOps",
//       "tags": ["communication"],
//       "dueDate": "2025-08-08",
//       "completed": "todo",
//       "position": 11,
//       "dependencies": [],
//       "subtasks": [
//         "Créer webhook",
//         "Tester canal #ci-cd"
//       ],
//       "priority": 0
//     },
//     {
//       "id": 13,
//       "title": "Développer endpoints REST",
//       "assignedTo": "Backend Team",
//       "tags": ["API"],
//       "dueDate": "2025-07-29",
//       "completed": "progress",
//       "position": 12,
//       "dependencies": [2],
//       "subtasks": [
//         "Définir routes",
//         "Écrire contrôleurs"
//       ],
//       "priority": 2
//     },
//     {
//       "id": 14,
//       "title": "Intégrer authentification OAuth",
//       "assignedTo": "Backend Team",
//       "tags": ["sécurité"],
//       "dueDate": "2025-07-29",
//       "completed": "todo",
//       "position": 13,
//       "dependencies": [13],
//       "subtasks": [
//         "Ajouter middleware",
//         "Tester flux OAuth"
//       ],
//       "priority": 2
//     },
//     {
//       "id": 15,
//       "title": "Implémenter pagination",
//       "assignedTo": "Backend Team",
//       "tags": ["API"],
//       "dueDate": "2025-07-30",
//       "completed": "progress",
//       "position": 14,
//       "dependencies": [13],
//       "subtasks": [
//         "Modifier requêtes DB",
//         "Ajouter paramètres page"
//       ],
//       "priority": 1
//     },
//     {
//       "id": 16,
//       "title": "Tester pipeline ETL",
//       "assignedTo": "Data Engineer",
//       "tags": ["data", "tests"],
//       "dueDate": "2025-07-31",
//       "completed": "progress",
//       "position": 15,
//       "dependencies": [2],
//       "subtasks": [
//         "Créer jeux de test",
//         "Valider intégrité données"
//       ],
//       "priority": 1
//     },
//     {
//       "id": 17,
//       "title": "Former modèle secondaire",
//       "assignedTo": "Ingénieur ML",
//       "tags": ["modélisation"],
//       "dueDate": "2025-07-31",
//       "completed": "progress",
//       "position": 16,
//       "dependencies": [3],
//       "subtasks": [
//         "Sélectionner features",
//         "Lancer entraînement"
//       ],
//       "priority": 1
//     },
//     {
//       "id": 18,
//       "title": "Rédiger tests d'intégration",
//       "assignedTo": "QA Engineer",
//       "tags": ["tests"],
//       "dueDate": "2025-08-01",
//       "completed": "app",
//       "position": 17,
//       "dependencies": [15],
//       "subtasks": [
//         "Couvrir scenarii critiques",
//         "Automatiser avec Cypress"
//       ],
//       "priority": 1
//     },
//     {
//       "id": 19,
//       "title": "Déployer sur staging",
//       "assignedTo": "DevOps",
//       "tags": ["deploy"],
//       "dueDate": "2025-08-02",
//       "completed": "progress",
//       "position": 18,
//       "dependencies": [16],
//       "subtasks": [
//         "Mettre à jour images Docker",
//         "Vérifier santé service"
//       ],
//       "priority": 2
//     },
//     {
//       "id": 20,
//       "title": "Analyser logs",
//       "assignedTo": "Ingénieur ML",
//       "tags": ["monitoring"],
//       "dueDate": "2025-08-02",
//       "completed": "progress",
//       "position": 19,
//       "dependencies": [19],
//       "subtasks": [
//         "Collecter métriques",
//         "Identifier anomalies"
//       ],
//       "priority": 1
//     },
//     {
//       "id": 21,
//       "title": "Valider UI responsive",
//       "assignedTo": "UI/UX Designer",
//       "tags": ["UI", "tests"],
//       "dueDate": "2025-08-01",
//       "completed": "progress",
//       "position": 20,
//       "dependencies": [6],
//       "subtasks": [
//         "Tester sur mobile",
//         "Corriger points d'affichage"
//       ],
//       "priority": 0
//     },
//     {
//       "id": 22,
//       "title": "Créer dépôt Git",
//       "assignedTo": "Équipe IA",
//       "tags": ["setup"],
//       "dueDate": "2025-07-20",
//       "completed": "done",
//       "position": 21,
//       "dependencies": [],
//       "subtasks": [
//         "Initialiser README",
//         "Ajouter .gitignore"
//       ],
//       "priority": 0
//     },
//     {
//       "id": 23,
//       "title": "Définir nomenclature des branches",
//       "assignedTo": "Architecte",
//       "tags": ["workflow"],
//       "dueDate": "2025-07-21",
//       "completed": "done",
//       "position": 22,
//       "dependencies": [22],
//       "subtasks": [
//         "Choisir conventions GitFlow",
//         "Documenter processus"
//       ],
//       "priority": 0
//     },
//     {
//       "id": 24,
//       "title": "Installer Docker",
//       "assignedTo": "DevOps",
//       "tags": ["infra"],
//       "dueDate": "2025-07-21",
//       "completed": "done",
//       "position": 23,
//       "dependencies": [],
//       "subtasks": [
//         "Rédiger Dockerfile",
//         "Construire image"
//       ],
//       "priority": 1
//     },
//     {
//       "id": 25,
//       "title": "Configurer Webpack",
//       "assignedTo": "Frontend Team",
//       "tags": ["build"],
//       "dueDate": "2025-07-22",
//       "completed": "done",
//       "position": 24,
//       "dependencies": [],
//       "subtasks": [
//         "Définir entry points",
//         "Ajouter loaders Babel"
//       ],
//       "priority": 1
//     },
//     {
//       "id": 26,
//       "title": "Installer ESLint",
//       "assignedTo": "Frontend Team",
//       "tags": ["qualité"],
//       "dueDate": "2025-07-22",
//       "completed": "done",
//       "position": 25,
//       "dependencies": [],
//       "subtasks": [
//         "Définir règles",
//         "Intégrer Pre-commit"
//       ],
//       "priority": 0
//     },
//     {
//       "id": 27,
//       "title": "Réaliser réunion kick-off",
//       "assignedTo": "Product Owner",
//       "tags": ["planification"],
//       "dueDate": "2025-07-20",
//       "completed": "done",
//       "position": 26,
//       "dependencies": [],
//       "subtasks": [
//         "Envoyer invitations",
//         "Préparer agenda"
//       ],
//       "priority": 1
//     },
//     {
//       "id": 28,
//       "title": "Écrire README initial",
//       "assignedTo": "Équipe IA",
//       "tags": ["documentation"],
//       "dueDate": "2025-07-21",
//       "completed": "done",
//       "position": 27,
//       "dependencies": [22],
//       "subtasks": [
//         "Décrire setup",
//         "Ajouter exemples d’utilisation"
//       ],
//       "priority": 0
//     },
//     {
//       "id": 29,
//       "title": "Définir conventions code",
//       "assignedTo": "Architecte",
//       "tags": ["qualité"],
//       "dueDate": "2025-07-22",
//       "completed": "done",
//       "position": 28,
//       "dependencies": [],
//       "subtasks": [
//         "Choisir style guide",
//         "Documenter standards"
//       ],
//       "priority": 1
//     },
//     {
//       "id": 30,
//       "title": "Mettre en place brand guidelines",
//       "assignedTo": "UI/UX Designer",
//       "tags": ["design"],
//       "dueDate": "2025-07-23",
//       "completed": "done",
//       "position": 29,
//       "dependencies": [],
//       "subtasks": [
//         "Définir palette de couleurs",
//         "Documenter typographies"
//       ],
//       "priority": 0
//     }
//   ]);
