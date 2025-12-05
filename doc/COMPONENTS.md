# Documentation des Composants

Liste des principaux composants Vue.js du projet.

## Composants Globaux (`src/components/`)

### `SnekSnek.vue`
Le jeu Snake complet.
- Gère la boucle de jeu (`requestAnimationFrame`).
- Gère les inputs clavier.
- Affiche le canvas du jeu.

### `ThePossessedVolumeSlider.vue`
Un slider de volume "hanté".
- Le bouton du slider se déplace automatiquement dans le conteneur.
- Il rebondit sur les bords.
- L'utilisateur doit l'attraper pour changer le volume.

### `TheSamuraiVolumeSlider.vue`
Un slider de volume basé sur le thème Samouraï.
- *(Détails spécifiques à l'implémentation)*

### `HelloWorld.vue` & `TheWelcome.vue`
Composants de base de l'échafaudage Vue (souvent utilisés comme placeholders ou page d'accueil par défaut).

## Vues (`src/views/`)

### `HomeView.vue`
Page d'accueil du site. Intègre généralement la `HeroSection`.

### `GamesView.vue`
Hub central pour accéder aux différents mini-jeux. Affiche une grille ou une liste des jeux disponibles.

### `RpgGameView.vue`
Interface principale du jeu de rôle (Eco Quest).
- Affiche l'historique du chat.
- Zone de saisie pour le joueur.
- Affiche les réponses des deux modèles d'IA (gauche/droite).

### `RpgSetupView.vue`
Formulaire de création de profil pour le RPG.
- Demande le nom, les compétences, les talents, etc.
- Lance la génération de la "Carte des Talents" via l'IA.

### `LLMGameView.vue`
Vue dédiée au jeu "Au Cœur du LLM".

### `VolumeGameView.vue`
Vue dédiée au "Volume Game", affichant les différents sliders interactifs.
