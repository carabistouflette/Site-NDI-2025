# Logique Métier et Gestion d'État

Cette section documente la logique métier encapsulée dans les Stores (Pinia) et les Composables.

## Stores (Pinia)

### `src/stores/rpgStore.ts`

Ce store est le cœur du jeu de rôle "Eco Quest". Il gère l'état de la partie, la communication avec l'IA et le profil du joueur.

#### État (State)
- **`userProfile`** : Informations saisies par le joueur (Compétences, Talents, etc.).
- **`talentStats`** : Statistiques générées par l'IA (Créativité, Logique, etc.).
- **`gameState`** : État actuel (`setup`, `playing`, `finished`).
- **`scenario`** : Scénario actif (`classic` ou `escape`).
- **`chatHistory`** : Historique des messages pour les deux modèles (`left` et `right`).
- **`models`** : Identifiants et noms des modèles d'IA utilisés.

#### Actions Principales
- **`initializeGame(router, scenario)`** : Prépare une nouvelle partie, sélectionne aléatoirement les modèles d'IA, et lance la génération des stats (si mode classique).
- **`generateTalentMapAI()`** : Envoie le profil utilisateur à l'IA pour générer des statistiques chiffrées (JSON). Comprend un fallback heuristique si l'IA échoue.
- **`startAdventure()`** : Initialise la conversation avec le prompt système approprié (Dian/Arianna pour l'Escape Game, ou MJ pour le mode Classique).
- **`sendUserMessageToModel(text, side)`** : Envoie le message du joueur à l'un des modèles et gère la réponse en streaming.
- **`_streamResponse(...)`** : Gère la connexion SSE (Server-Sent Events) avec le backend pour afficher la réponse de l'IA caractère par caractère.

## Composables

### `src/composables/useScrollAnimations.ts`

Ce composable fournit des utilitaires pour animer les éléments lors du défilement de la page.

- **Fonctionnalité** : Utilise probablement `IntersectionObserver` pour détecter quand un élément entre dans la vue.
- **Utilisation** : Permet d'ajouter des classes CSS (ex: `fade-in`, `slide-up`) aux éléments HTML pour créer des effets d'apparition dynamiques.
